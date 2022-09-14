import { RequestHandler } from 'express'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import db from '../database'
import dotenv from 'dotenv'
import { PendingUser, User, UserWithPassword } from '../types'


dotenv.config()


const DATABASE = process.env.DATABASE
const USERS_COLLECTION = process.env.USERS_COLLECTION
const PENDING_COLLECTION = process.env.PENDING_COLLECTION
const OAUTH_COLLECTION = process.env.OAUTH_COLLECTION
const TODOS_COLLECTION = process.env.TODOS_COLLECTION


export const checkIfUserAlreadyExists: RequestHandler = async (req, res, next) => {
  const email = req.body.email
  // check if user already exists in login
  const userFound = await db.findUser(DATABASE, USERS_COLLECTION, { email })
  if (userFound) {
    return res.status(406).json({
      message: `Email address ${email} has already been taken, please use another email address.`
    })
  }
  // check if user already exists in oauth
  const oauthFound = await db.findUser(DATABASE, OAUTH_COLLECTION, { email })
  if (oauthFound) {
    return res.status(406).json({
      message: `Email address ${email} has already been registered, please use OAuth to login again.`
    })
  }
  // all checks passed
  next()
}

export const registerPendingUser: RequestHandler = async (req, res) => {
  // user info
  const { email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  // generate activation token
  const activationToken = crypto.randomBytes(64).toString('hex')
  // send activation email
  console.log(`http://localhost:8888/api/activate?email=${email}&activationToken=${activationToken}`) // TODO
  // add user as pending
  await db.upsertPendingUser(DATABASE, PENDING_COLLECTION, { email, hashedPassword, activationToken })
  // redirect to login
  return res.json({
    message: `An activation email has been sent to ${email}, please verify your account before login.`
  })
}

export const verifyPendingUser: RequestHandler = async (req, res, next) => {
  // extract email and activationToken from url
  const pendingUser = req.query as unknown as PendingUser
  // find pending user from database
  const foundPendingUser = await db.findPendingUser(DATABASE, PENDING_COLLECTION, { email: pendingUser.email })
  if (!foundPendingUser)
    return res.status(404).json({ message: `The user ${pendingUser.email} is not found, please register first.` })
  // verify activationToken is valid
  if (pendingUser.activationToken !== foundPendingUser.activationToken)
    return res.status(406).json({ message: `Activation for ${pendingUser.email} failed.` })
  // pass user to next
  const { email, hashedPassword } = foundPendingUser
  req.body.verifiedUser = { email, hashedPassword }
  // delete pending user
  await db.deletePendingUsers(DATABASE, PENDING_COLLECTION, { email })
  // all checks passed
  next()
}

export const addNewUserSampleData: RequestHandler = async (req, res, next) => {
  // ensure verifiedUser exists
  if (!req.body.verifiedUser)
    return res.status(404).json({ message: 'Failed to activate user, please register again.' })
  const email = req.body.verifiedUser.email
  // insert a new entry for the new user
  await db.insertTodo(DATABASE, TODOS_COLLECTION, {
    user: email, title: `Hello ${email}`, content: `Hi! This is your first task.`
  })
  next()
}

export const registerUserToDatabase: RequestHandler = async (req, res) => {
  // ensure a verifiedUser exists
  if (!req.body.verifiedUser)
    return res.status(404).json({ message: 'Failed to activate user, please register again.' })
  const { email, hashedPassword } = req.body.verifiedUser as UserWithPassword
  // add verified user to database
  db.insertUser(DATABASE, USERS_COLLECTION, { email, hashedPassword })
  return res.status(200)
    .cookie('message', 'User verified successfully, you may login now.')
    .redirect('/login')
}

export const upsertOAuthUserToDatabase: RequestHandler = async (req, res, next) => {
  // upsert oauth user
  const { email } = req.body
  db.upsertOAuthUser(DATABASE, OAUTH_COLLECTION, { email })
  next()
}
