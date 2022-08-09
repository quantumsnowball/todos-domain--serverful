import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import history from 'connect-history-api-fallback'
import jwt from 'jsonwebtoken'

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
    res.send('Hello World! Greeting from Express JS.')
})

api.post('/login', (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!userIsValid(email, password))
        res.status(401).json({
            message: `User ${email} does not exist, please try again`
        })
    const { accessToken, refreshToken } = signAccessToken({
        id: Date.now(),
        username: email
    })
    res.status(200).json({
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

//
// dev dummy simulation
//
const userIsValid = (email: string, password: string) =>
    (email === 'a@b.c' && password === 'w')

// JWT helpers
const signAccessToken = (payload: any) => {
    const accessToken = jwt.sign(
        { ...payload }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' })
    const refreshToken = jwt.sign(
        { ...payload }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5m' })
    return { accessToken, refreshToken }
}
