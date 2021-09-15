import { findOrCreate } from './../services/auth'
import passport from 'passport'
import passportLocal from 'passport-local'
import passportFacebook from 'passport-facebook'
import googleStrategy from 'passport-google-id-token'

const LocalStrategy = passportLocal.Strategy
const FacebookStrategy = passportFacebook.Strategy

export const google = new googleStrategy(
  {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  async (parsedToken: any, googleId: any, done: any) => {
    await findOrCreate(parsedToken, googleId, done)
  }
)
