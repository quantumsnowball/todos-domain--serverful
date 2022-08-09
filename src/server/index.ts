import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import history from 'connect-history-api-fallback'
import { User } from './types'
import {
    userAlreadyExists,
    userIsAuthorized,
    signAccessToken
} from './auth'

//
// dev dummy simulation
//
// dummy user database
const users: User[] = [{ email: 'a@b.c', password: 'w' }]

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
// middleware
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
    res.send({
        message: 'Hello World! Greeting from Express JS.'
    })
})

api.post('/register', (req: Request, res: Response) => {
    const { email, password } = req.body

    if (userAlreadyExists(email, users)) {
        res.status(406).json({
            message: `Email address ${email} has already been taken, please use another email address.`
        })
        return
    }

    try {
        users.push({ email, password })
        res.status(200).json({
            message: `User ${email} is registered successfully.`
        })
    } catch (error) {
        res.status(406).json({ message: error })
    }
})

api.post('/login', (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!userIsAuthorized(email, password, users)) {
        res.status(401).json({
            message: `User ${email} does not exist, please try again.`
        })
        return
    }

    const { accessToken, refreshToken } = signAccessToken({
        id: Date.now(),
        username: email
    })
    res.json({
        message: `Logged in as ${email}`,
        accessToken,
        refreshToken
    })
})

app.use('/api', api)

// 
// port
//
app.listen(port_server, () => {
    console.log(`Express server listening on port ${port_server}`)
})

