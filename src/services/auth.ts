import JWT from 'jsonwebtoken'
import User, { UserDocument } from '../models/User'

import { Request, Response, NextFunction } from 'express'

export const generateToken = (user: any) => {
  return JWT.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      imageUrl: user.picture,
    },
    process.env.JWT_SECRET as string
  )
}

export const findOrCreate = async (
  parsedToken: any,
  googleId: any,
  done: any
) => {
  try {
    console.log('parsedToken', parsedToken)
    //check if the account already exists
    const userExisting = await User.findOne({
      email: parsedToken.payload.email,
    })
    if (userExisting) {
      console.log('User already exists in our database')
      done(null, userExisting)
    } else {
      console.log('Creating new user.')
      console.log(parsedToken.payload)

      //if new user create user
      const newUser = new User({
        name: parsedToken.payload.name,
        email: parsedToken.payload.email,
        isAdmin: false,
        imageUrl: parsedToken.payload.picture,
      })
      await newUser.save()
      done(null, newUser)
    }
  } catch (error) {
    done(error, error.message)
    console.log(error)
  }
}

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  console.log(authHeader)
  console.log(token)
  // Bearer removing
  if (token && process.env.JWT_SECRET) {
    const decodedToken = JWT.verify(token, process.env.JWT_SECRET)
    console.log(decodedToken)
    req.user = decodedToken
    next()
  } else {
    return res.status(401).send({ message: 'Invalid Token' })
  }
}

export const isAdministrator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: any = req.user
  console.log(user)
  console.log(req.user)
  if (user.isAdmin) {
    next()
  } else {
    res.status(401).send({ msg: 'Administrator rights only.' })
  }
}
