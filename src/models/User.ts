/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'
export type UserDocument = Document & {
  name: string
  email: string
  isAdmin: boolean
  imageUrl: string
}

const userSchema = new mongoose.Schema(
  {
    
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false, required: true },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<UserDocument>('User', userSchema)

/* 
{
  name: '',
  email: '',
  isAdmin: false,
  imageUrl: '',
  _id: '',
  createdAt: '',
  updatedAt: '',
__v: 0,
} */
