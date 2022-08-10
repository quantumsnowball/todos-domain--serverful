import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import history from 'connect-history-api-fallback'
import {
  checkIfUserAlreadyExists,
  registerUserToDatabase,
  checkUserEmailPassword,
  signToken
} from './middleware/auth'


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

