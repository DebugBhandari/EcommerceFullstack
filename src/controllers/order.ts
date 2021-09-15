import { Request, Response, NextFunction } from 'express'

import Order from '../models/Order'
import OrderService from '../services/order'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

// POST /movies
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { items, address } = req.body
    const user: any = req.user
    const products = items.map((item: any) => {
      return {
        productId: item._id,
        quantity: parseFloat(item.quantity),
        price: parseFloat(item.price),
        imageUrl: item.imageUrl,
      }
    })
    console.log(products)
    const order = new Order({
      cartProducts: products,
      shippingAddress: address,
      userId: user.id,
    })
    console.log(order)
    const savedOrder = await OrderService.create(order)
    res.status(200).json(savedOrder)
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

// PUT /movies/:movieId
export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const orderId = req.params.orderId
    const updatedOrder = await OrderService.update(orderId, update)
    res.json(updatedOrder)
  } catch (error) {
    next(new NotFoundError('Order not found', error))
  }
}

// DELETE /movies/:movieId
export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await OrderService.deleteOrder(req.params.orderId)
    res.status(204).end()
  } catch (error) {
    next(new NotFoundError('Order not found', error))
  }
}

// GET /movies/:movieId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await OrderService.findById(req.params.orderId))
  } catch (error) {
    next(new NotFoundError('Product not found', error))
  }
}

// GET /movies
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await OrderService.findAll())
  } catch (error) {
    next(new NotFoundError('Products not found', error))
  }
}
