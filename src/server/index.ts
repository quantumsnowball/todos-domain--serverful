import express, { Request, Response } from 'express'
import dotenv from 'dotenv'


// configs
dotenv.config()
const app = express()
const api = express.Router()
const port = process.env.PORT

// static serving
app.use(express.static('dist'))

// paths
api.route('/hello').get((_: Request, res: Response) => {
    res.send('Hello World! Greeting from Express JS.')
})

api.post('/login', (_: Request, res: Response) => {
    res.send('Hello User! You are logging in ...')
})

app.use('/api', api)

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`)
})
