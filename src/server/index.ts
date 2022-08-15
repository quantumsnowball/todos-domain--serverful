import dotenv from 'dotenv'
import app from './app'
import { testMongoDb } from './database'

// env
dotenv.config()
const port_server = process.env.PORT_SERVER || 3000

// test MongoDB
testMongoDb()

// startt express server
app.listen(port_server, () => {
  console.log(`Express server listening on port ${port_server}`)
})
