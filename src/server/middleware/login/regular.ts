import bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import db from '../../database'
import dotenv from 'dotenv'


dotenv.config()


const DATABASE = process.env.DATABASE
const USERS_COLLECTION = process.env.USERS_COLLECTION


export const checkUserEmailPassword: RequestHandler = async (req, res, next) => {
  const email = req.body.email
  // check email
  const user = await db.findUser(DATABASE, USERS_COLLECTION, { email })
  if (!user)
    return res.status(401).json({
      message: `User ${req.body.email} does not exist, please try again.`
    })
  // check password
  const passwordMatch = await bcrypt.compare(req.body.password, user.hashedPassword)
  if (!passwordMatch)
    return res.status(401).json({
      message: `Your password is incorrect.`
    })
  // all checks passed
  next()
}
