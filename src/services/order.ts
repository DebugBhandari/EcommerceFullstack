import Order, { OrderDocument } from '../models/Order'

function create(order: OrderDocument): Promise<OrderDocument> {
  return order.save()
}

function findById(orderId: string): Promise<OrderDocument> {
  return Order.findById(orderId)
    .exec() // .exec() will return a true Promise
    .then((product) => {
      if (!product) {
        throw new Error(`Order ${orderId} not found`)
      }
      return product
    })
}

function findAll(): Promise<OrderDocument[]> {
  return Order.find().sort({ userID: 1 }).exec() // Return a Promise
}

function update(
  orderId: string,
  update: Partial<OrderDocument>
): Promise<OrderDocument> {
  return Order.findById(orderId)
    .exec()
    .then((order) => {
      if (!order) {
        throw new Error(`Order ${orderId} not found`)
      }

      /*  if (update.orderItems) {
        order.orderItems = update.orderItems
      }
      if (update.shippingAddress) {
        order.shippingAddress = update.shippingAddress
      }
      if (update.userId) {
        order.userId = update.userId
      }
      if (update.total) {
        order.total = update.total
      } */

      // Add more fields here if needed
      return order.save()
    })
}

function deleteOrder(orderId: string): Promise<OrderDocument | null> {
  return Order.findByIdAndDelete(orderId).exec()
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteOrder,
}
