import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'


// env
dotenv.config()
const host_mongo = process.env.HOST_MONGO
const port_mongo = process.env.PORT_MONGO

// globals
const url_mongo = `mongodb://${host_mongo}:${port_mongo}`
const client = new MongoClient(url_mongo)


// test
export const testMongoDb = async () => {
  try {
    // try connect
    await client.connect()
    const collection = client.db('test').collection('dummy')
    // try create
    await collection.insertOne({ name: 'foo' })
    console.log("Connected to MongoDB successfully")
    // try read
    const results = await collection.findOne({})
    console.log(results)
  } finally {
    // close
    await client.close()
  }
}

export const insertUser = async () => {

}
