import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from './types'
import { RequestHandler } from 'express'


//
// dev dummy simulation
//
// dummy user database
const users: User[] = []

// middleware
export const checkIfUserAlreadyExists: RequestHandler = (req, res, next) => {
  const userFound = users.find(user => user.email === req.body.email)
  if (userFound)
    return res.status(406).json({
      message: `Email address ${userFound.email} has already been taken, please use another email address.`
    })
  next()
}

export const registerUserToDatabase: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    users.push({ email, hashedPassword })
    return res.status(200).json({ message: `User ${email} is registered successfully.` })
  } catch (error) {
    return res.status(406).json({ message: error })
  }
}

export const checkUserEmailPassword: RequestHandler = async (req, res, next) => {
  // check email
  const user = users.find(user => user.email === req.body.email)
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
  const { email } = req.body
  const { accessToken, refreshToken } = signAccessToken({ id: Date.now(), username: email })
  return res.json({
    message: `Logged in as ${email}`,
    accessToken,
    refreshToken
  })
}

// JWT helpers
export const signAccessToken = (payload: any) => {
  const accessToken = jwt.sign(
    { ...payload }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' })
  const refreshToken = jwt.sign(
    { ...payload }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5m' })
  return { accessToken, refreshToken }
}

