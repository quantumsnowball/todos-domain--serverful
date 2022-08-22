import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { RequestHandler } from 'express'
import db from '../database'
import dotenv from 'dotenv'
import { TodoDocument } from '../types'


dotenv.config()


const DATABASE = process.env.DATABASE
const TODOS_COLLECTION = process.env.TODOS_COLLECTION


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

export const fetchTodos: RequestHandler = async (req, res) => {
  // decode to get back user infos
  const decoded = jwt.decode(req.cookies.accessToken)
  if (typeof decoded === 'string' || !decoded.hasOwnProperty('user'))
    return res.status(400).json({ message: 'Failed to decode refreshToken.' })
  // query database to return todos list
  const user = decoded.user
  const filter = { user }
  const todos = await db.findTodos(DATABASE, TODOS_COLLECTION, filter)
  return res.status(200).json({ payload: todos })
}

export const insertTodo: RequestHandler = async (req, res) => {
  // decode to get back user infos
  const decoded = jwt.decode(req.cookies.accessToken)
  if (typeof decoded === 'string' || !decoded.hasOwnProperty('user'))
    return res.status(400).json({ message: 'Failed to decode refreshToken.' })
  // add a new entry to database
  const user = decoded.user
  const todo = req.body
  const doc: TodoDocument = { user, ...todo }
  console.log(doc)
  await db.insertTodo(DATABASE, TODOS_COLLECTION, doc)
  return res.status(200).json({ message: 'TodoDocument insert successfully.' })
}

