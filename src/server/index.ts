import express, { Request, Response } from 'express'
import dotenv from 'dotenv'


// configs
dotenv.config()
const app = express()
const port = process.env.PORT


// paths
app.get('/', (_: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`)
})
