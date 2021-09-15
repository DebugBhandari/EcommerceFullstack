/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document, mongo } from 'mongoose'

export type ProductDocument = Document & {
  name: string
  imageUrl: string
  brand: string
  category: string
  description: string
  price: number
  countInStock: number
}

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<ProductDocument>('Product', productSchema)
