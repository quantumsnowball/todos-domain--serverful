import { RequestHandler } from 'express'
import bcrypt from 'bcrypt'
import db from '../database'
import dotenv from 'dotenv'


dotenv.config()


const DATABASE = process.env.DATABASE
const USERS_COLLECTION = process.env.USERS_COLLECTION
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

export const addNewUserSampleData: RequestHandler = async (req, res, next) => {
  const email = req.body.email
  // when a new user is registered give
  await db.insertTodo(DATABASE, TODOS_COLLECTION, {
    user: email, title: `Hello ${email}`, content: `Hi! This is your first task.`
  })
  next()
}

export const registerUserToDatabase: RequestHandler = async (req, res) => {
  // add user to database
  const { email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  db.insertUser(DATABASE, USERS_COLLECTION, { email, hashedPassword })
  return res.status(200).json({ message: `User ${email} is registered successfully.` })
}

export const upsertOAuthUserToDatabase: RequestHandler = async (req, res, next) => {
  // upsert oauth user
  const { email } = req.body
  db.upsertOAuthUser(DATABASE, OAUTH_COLLECTION, { email })
  next()
}
