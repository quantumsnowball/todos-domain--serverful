import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { TokenPayload } from '../types'
import { RequestHandler } from 'express'
import db from '../database'


// globals
const DATABASE = 'todos'
const USERS_COLLECTION = 'users'

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
    console.log(error)
    return res.status(401).json({
      message: error.toString()
    })
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
    if (tokens.includes(refreshToken) && jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)) {
      next()
    }
  } catch (error) { }
  return res.status(401).json({ message: 'Session expired, please login again.' })
}

export const signToken: RequestHandler = async (req, res) => {
  // sign token
  const { email } = req.body
  const payload: TokenPayload = { id: Date.now(), user: email }
  const accessToken = jwt.sign(
    { ...payload }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' })
  const refreshToken = jwt.sign(
    { ...payload }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5m' })
  tokens.push(refreshToken)
  return res
    .cookie('accessToken', accessToken, { httpOnly: true })
    .json({
      message: `Logged in as ${email}`,
      refreshToken
    })
}

export const renewToken: RequestHandler = (req, res) => {
  const { email } = req.body
  const payload: TokenPayload = { id: Date.now(), user: email }
  const accessToken = jwt.sign(
    { ...payload }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' })
  return res.status(200)
    .cookie('accessToken', accessToken, { httpOnly: true })
    .json({ message: 'Token renew successfully.' })
}

