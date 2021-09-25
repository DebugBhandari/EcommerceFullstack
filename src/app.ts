import { generateToken, isAuth } from './services/auth'
import { JWT_SECRET } from './util/secrets'
import JWT from 'jsonwebtoken'
import express, { Request, Response, NextFunction } from 'express'
import compression from 'compression'
import session from 'express-session'
import bodyParser from 'body-parser'
import lusca from 'lusca'
import flash from 'express-flash'
import path from 'path'
import mongoose from 'mongoose'
import passport from 'passport'
import dotenv from 'dotenv'
//const pool = require('./db')

import productRouter from './routers/product'
import userRouter from './routers/user'
import orderRouter from './routers/order'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import { google } from './config/passport'
import cors from 'cors'
import bcrypt from 'bcrypt-nodejs'
import uploadImage from './routers/uploadImage'

dotenv.config({ path: '.env' })
const app = express()

app.use(express.json()) // => req.body

// Express configuration
app.set('port', process.env.PORT || 3000)
app.use(cors())

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'))
  })
}
// Use common 3rd-party middlewares
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
app.use(passport.initialize())

passport.use(google)

app.post(
  '/google/login',
  passport.authenticate('google-id-token', {
    session: false,
  }),
  (req: Request, res: Response, next: NextFunction) => {
    const accessToken = generateToken(req.user)
    console.log('user', req.user)
    res.send({ accessToken: accessToken, user: req.user })
  }
)

// Use movie router
app.use('/api/uploads', uploadImage)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/order', orderRouter)

// Custom API error handler
app.use(apiErrorHandler)



export default app
