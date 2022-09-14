import express, { Request, Response } from 'express'
import history from 'connect-history-api-fallback'
import passport from 'passport'
import './middleware/passport'
import {
  addNewUserSampleData,
  checkIfUserAlreadyExists,
  registerPendingUser,
  registerUserToDatabase,
  upsertOAuthUserToDatabase,
  verifyPendingUser,
} from './middleware/register'
import {
  checkUserEmailPassword
} from './middleware/login/regular'
import {
  signAfterLogin,
  signAfterOAuth
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


//
// routes
//
const app = express()
// redirect all GET requests with subpaths to the default index.html
// except /api endpoints
app.use(history({
  rewrites: [
    { from: /^\/api\/.*$/, to: context => context.parsedUrl.path }
  ]
}))
//
// global middleware
//
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
//
// - api
//
const api = express.Router()

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
  registerPendingUser
)

api.get('/activate',
  verifyPendingUser,
  addNewUserSampleData,
  registerUserToDatabase
)

api.post('/login',
  checkUserEmailPassword,
  signAfterLogin
)

api.get('/login-google',
  passport.authenticate('google', { session: false }),
  upsertOAuthUserToDatabase,
  signAfterOAuth
)

api.post('/renew',
  checkRefreshToken,
  renewToken
)

app.use('/api', api)

//
// export
//
export default app
