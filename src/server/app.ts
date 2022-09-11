import express, { Request, Response } from 'express'
import history from 'connect-history-api-fallback'
import {
  addNewUserSampleData,
  checkIfUserAlreadyExists,
  registerUserToDatabase,
} from './middleware/register'
import {
  googleOAuth2
} from './middleware/login/google'
import {
  checkUserEmailPassword
} from './middleware/login/regular'
import {
  signToken
} from './middleware/login'
import {
  checkRefreshToken,
  renewToken
} from './middleware/renew'
import {
  checkAccessToken,
  fetchTodos,
  insertTodo,
  deleteTodo
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

api.put('/todos',
  checkAccessToken,
  insertTodo
)

api.delete('/todos',
  checkAccessToken,
  deleteTodo
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

api.post('/login-google',
  googleOAuth2,
  signToken
)

api.post('/renew',
  checkRefreshToken,
  renewToken
)

app.use('/api', api)


export default app
