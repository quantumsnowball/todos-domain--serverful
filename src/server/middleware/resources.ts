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


