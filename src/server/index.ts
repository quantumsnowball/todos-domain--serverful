import express, { Request, Response } from 'express'
import dotenv from 'dotenv'


// configs
dotenv.config()
const app = express()
const port = process.env.PORT

// static serving
app.use(express.static('dist'))

// paths
app.get('/hello', (_: Request, res: Response) => {
    res.send('Hello World! I am from Express JS')
})

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`)
})
