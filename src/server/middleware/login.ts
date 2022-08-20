import jwt from 'jsonwebtoken'
import { RequestHandler } from 'express'
import bcrypt from 'bcrypt'
import db from '../database'
import { TokenPayload } from '../types'
import dotenv from 'dotenv'


dotenv.config()


const DATABASE = process.env.DATABASE
const USERS_COLLECTION = process.env.USERS_COLLECTION
const ACCESS_TOKEN_LIFETIME = process.env.ACCESS_TOKEN_LIFETIME
const REFRESH_TOKEN_LIFETIME = process.env.REFRESH_TOKEN_LIFETIME


export const tokens: string[] = []


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

export const signToken: RequestHandler = async (req, res) => {
  // sign token
  const { email } = req.body
  const payload: TokenPayload = { id: Date.now(), user: email }
  const accessToken = jwt.sign(
    { ...payload }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_LIFETIME })
  const refreshToken = jwt.sign(
    { ...payload }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_LIFETIME })
  tokens.push(refreshToken)
  return res
    .cookie('accessToken', accessToken, { httpOnly: true })
    .json({
      message: `Logged in as ${email}`,
      refreshToken
    })
}
