import express, { Request, Response } from 'express'
import history from 'connect-history-api-fallback'
import {
  addNewUserSampleData,
  checkIfUserAlreadyExists,
  registerUserToDatabase,
} from './middleware/register'
import {
  checkUserEmailPassword,
  signToken
} from './middleware/login'
import {
  checkRefreshToken,
  renewToken
} from './middleware/renew'
import {
  checkAccessToken,
  fetchTodos
} from './middleware/resources'
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
  fetchTodos
)

api.post('/register',
  checkIfUserAlreadyExists,
  addNewUserSampleData,
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
