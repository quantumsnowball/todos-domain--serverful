import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import history from 'connect-history-api-fallback'
import {
  checkAccessToken,
  checkIfUserAlreadyExists,
  registerUserToDatabase,
  checkUserEmailPassword,
  signToken
} from './middleware/auth'
import cookieParser from 'cookie-parser'


//
// Configs
//
// .env
dotenv.config()
const port_server = process.env.PORT_SERVER || 3000
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
      { title: 'item1', content: 'content1' },
      { title: 'item2', content: 'content2' },
      { title: 'item3', content: 'content3' }
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

app.use('/api', api)

// 
// port
//
app.listen(port_server, () => {
  console.log(`Express server listening on port ${port_server}`)
})

