import jwt, { TokenExpiredError } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { TokenPayload } from '../types'
import { RequestHandler } from 'express'
import db from '../database'


// globals
const DATABASE = 'todos'
const USERS_COLLECTION = 'users'
const ACCESS_TOKEN_LIFETIME = '5s'
const REFRESH_TOKEN_LIFETIME = '2m'

//
// dev dummy simulation
//
// dummy user database
const tokens: string[] = []

// 
// middleware
//
export const checkAccessToken: RequestHandler = (req, res, next) => {
  // check if the jwt token is still valid
  try {
    jwt.verify(
      req.cookies.accessToken,
      process.env.ACCESS_TOKEN_SECRET
    )
    next()
  } catch (error) {
    if (error instanceof TokenExpiredError)
      return res.status(401).json({
        message: 'Your access token is expired, needs renewal.',
        url: `${req.baseUrl}/renew`
      })
    return res.status(400).json({ message: error.toString() })
  }
}

export const checkIfUserAlreadyExists: RequestHandler = async (req, res, next) => {
  const email = req.body.email
  // check if user already exists
  const userFound = await db.findUser(DATABASE, USERS_COLLECTION, { email })
  if (userFound) {
    return res.status(406).json({
      message: `Email address ${email} has already been taken, please use another email address.`
    })
  }
  // all checks passed
  next()
}

export const registerUserToDatabase: RequestHandler = async (req, res) => {
  // add user to database
  const { email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  db.insertUser(DATABASE, USERS_COLLECTION, { email, hashedPassword })
  return res.status(200).json({ message: `User ${email} is registered successfully.` })
}

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

export const renewToken: RequestHandler = (req, res) => {
  // decode to get back user infos
  const decoded = jwt.decode(req.body.refreshToken)
  if (typeof decoded === 'string' || !decoded.hasOwnProperty('user'))
    return res.status(400).json({ message: 'Failed to decode refreshToken.' })
  // sign new access token and return 200
  const payload: TokenPayload = { id: Date.now(), user: decoded.user }
  const accessToken = jwt.sign(
    { ...payload }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_LIFETIME })
  return res.status(200)
    .cookie('accessToken', accessToken, { httpOnly: true })
    .json({ message: 'Token renew successfully.' })
}

