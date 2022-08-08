import express, { Request, Response } from 'express'
import path from 'path'
import dotenv from 'dotenv'
import history from 'connect-history-api-fallback'


// configs
dotenv.config()
const app = express()
const api = express.Router()
const port_server = process.env.PORT_SERVER || 3000
app.use(history())

// static serving
app.use(express.static('dist'))

// default
app.get('*', function(_: Request, res: Response) {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})
// paths
api.route('/hello').get((_: Request, res: Response) => {
    res.send('Hello World! Greeting from Express JS.')
})

api.post('/login', (_: Request, res: Response) => {
    res.send('Hello User! You are logging in ...')
})

app.use('/api', api)

app.listen(port_server, () => {
    console.log(`Express server listening on port ${port_server}`)
})
