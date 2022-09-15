import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import dotenv from 'dotenv'


dotenv.config()


const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET
// const CALLBACK_URL = 'http://localhost:8888/api/login-google-callback'
const CALLBACK_URL = 'http://localhost:8888/api/login-google'


export const verifyFunction = new GoogleStrategy(
  {
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: ['email'],
    passReqToCallback: true
  },
  (req, accessToken, refreshToken, profile, cb) => {
    const email = profile.emails[0].value
    if (!email)
      return cb(null, false)
    req.body.email = email
    return cb(null, email)
  }
)
