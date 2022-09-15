import dotenv from 'dotenv'
import app from './app'
import db from './database'

// env
dotenv.config()
const port_server = process.env.PORT_SERVER || 3000

// globals
const TEST_DATABASE = 'test'
const TEST_COLLECTION = 'playground'

// test MongoDB
db.test(TEST_DATABASE, TEST_COLLECTION)

// startt express server
app.listen(port_server, () => {
  console.log(`Express server listening on port ${port_server}`)
})
