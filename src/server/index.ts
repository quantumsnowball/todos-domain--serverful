import dotenv from 'dotenv'
import mongoose from 'mongoose'
import app from './app'


dotenv.config()
const port_server = process.env.PORT_SERVER || 3000
const host_mongo = process.env.HOST_MONGO
const port_mongo = process.env.PORT_MONGO

// connect to mongo
mongoose.connect(`mongodb://${host_mongo}:${port_mongo}`).then(() => {
  console.log('Connected to MongoDB')
  // startt express server
  app.listen(port_server, () => {
    console.log(`Express server listening on port ${port_server}`)
  })
})

