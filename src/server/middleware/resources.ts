import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { RequestHandler } from 'express'


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


export const fetchTodos: RequestHandler = (req, res) => {
  // decode to get back user infos
  const decoded = jwt.decode(req.cookies.accessToken)
  if (typeof decoded === 'string' || !decoded.hasOwnProperty('user'))
    return res.status(400).json({ message: 'Failed to decode refreshToken.' })
  // should query a database to return todos list and user info
  const data = {
    user: decoded.user,
    todos: [
      { title: 'item1', content: Date.now() },
      { title: 'item2', content: Date.now() },
      { title: 'item3', content: Date.now() }
    ]
  }
  return res.status(200).json(data)
}

