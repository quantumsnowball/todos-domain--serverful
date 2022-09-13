import jwt from 'jsonwebtoken'
import { RequestHandler } from 'express'
import { TokenPayload } from '../../types'
import dotenv from 'dotenv'


dotenv.config()


const ACCESS_TOKEN_LIFETIME = process.env.ACCESS_TOKEN_LIFETIME
const REFRESH_TOKEN_LIFETIME = process.env.REFRESH_TOKEN_LIFETIME


export const tokens: string[] = []


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


export const signAfterOAuth: RequestHandler = async (req, res) => {
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
    .cookie('refreshToken', refreshToken)
    .redirect('/')
}

