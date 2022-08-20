import jwt from 'jsonwebtoken'
import { RequestHandler } from 'express'
import { TokenPayload } from '../types'
import { tokens } from './login'
import dotenv from 'dotenv'


dotenv.config()




export const checkRefreshToken: RequestHandler = (req, res, next) => {
  const { refreshToken } = req.body
  try {
    const tokenExists = tokens.includes(refreshToken)
    const tokenVerified = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    console.log({ tokenExists, tokenVerified })
    if (tokenExists && tokenVerified) {
      console.log('Token verified, gonna refresh it and then send back.')
      next()
    } else
      return res.status(401).json({ message: 'Session expired, please login again.' })
  } catch (error) {
    return res.status(401).json({ message: error.toString() })
  }
}

export const renewToken: RequestHandler = (req, res) => {
  // decode to get back user infos
  const decoded = jwt.decode(req.body.refreshToken)
  if (typeof decoded === 'string' || !decoded.hasOwnProperty('user'))
    return res.status(400).json({ message: 'Failed to decode refreshToken.' })
  // sign new access token and return 200
  const payload: TokenPayload = { id: Date.now(), user: decoded.user }
  const accessToken = jwt.sign(
    { ...payload }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFETIME })
  return res.status(200)
    .cookie('accessToken', accessToken, { httpOnly: true })
    .json({ message: 'Token renew successfully.' })
}

