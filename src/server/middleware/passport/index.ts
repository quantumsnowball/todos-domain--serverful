import passport from 'passport'
import { verifyFunction as google } from './googleOAuth2'


passport.use(google)
