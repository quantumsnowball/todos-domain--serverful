import express, { Request, Response } from 'express'
import history from 'connect-history-api-fallback'
import {
  checkAccessToken,
  checkIfUserAlreadyExists,
  registerUserToDatabase,
  checkUserEmailPassword,
  signToken,
  checkRefreshToken,
  renewToken
} from './middleware/auth'
import cookieParser from 'cookie-parser'


// routes
const app = express()
const api = express.Router()
app.use(history())
// global middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

//
// static serving
//
app.use(express.static('dist'))

//
// paths
//
api.route('/hello').get((_: Request, res: Response) => {
  return res.send({
    message: 'Hello World! Greeting from Express JS.'
  })
})

api.post('/todos',
  checkAccessToken,
  (_: Request, res: Response) => {
    return res.status(200).json([
      { title: 'item1', content: Date.now() },
      { title: 'item2', content: Date.now() },
      { title: 'item3', content: Date.now() }
    ])
  }

)

api.post('/register',
  checkIfUserAlreadyExists,
  registerUserToDatabase
)

api.post('/login',
  checkUserEmailPassword,
  signToken
)

api.post('/renew',
  checkRefreshToken,
  renewToken
)

app.use('/api', api)


export default app
