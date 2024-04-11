/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

type ShippingAddress = {
  fullName: string
  address: string
  city: string
  postalCode: string
  country: string
}

export type OrderDocument = Document & {
  cartProducts: [
    {
      productId: string
      quantity: number
      price: number
      imageUrl: string
    }
  ]
  shippingAddress: ShippingAddress
  userId: string
  total?: number
}

const orderSchema = new mongoose.Schema(
  {
    cartProducts: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
        },
        price: {
          type: Number,
        },
        imageUrl: {
          type: String,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    total: { type: Number },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<OrderDocument>('Order', orderSchema)

/* 

export type Order = {
    orderItems:[
      {
        name: string
        qty: number
        image: string
        price: number
        product: Product
      }
    ]
    shippingAddress: {
      fullname: string
      address: string
      city: string
      postalCode: string
      country: string
    }
  } */
