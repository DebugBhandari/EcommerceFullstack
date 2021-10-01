import { findOrCreate } from './../services/auth'
import passport from 'passport'
import passportLocal from 'passport-local'
import passportFacebook from 'passport-facebook'
const googleStrategy = require('passport-google-id-token')

const LocalStrategy = passportLocal.Strategy
const FacebookStrategy = passportFacebook.Strategy

export const google = new googleStrategy(
  {
    clientId: "701388926312-pd0te09anv6p15h6q8soj9uk9h7tb1e0.apps.googleusercontent.com",
  },
  async (parsedToken: any, googleId: any, done: any) => {
    await findOrCreate(parsedToken, googleId, done)
  }
)
