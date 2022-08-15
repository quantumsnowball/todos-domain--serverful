import dotenv from 'dotenv'
import { MongoClient, Collection } from 'mongodb'
import { MongoOperation } from '../types'


// env
dotenv.config()
const host_mongo = process.env.HOST_MONGO
const port_mongo = process.env.PORT_MONGO

// globals
const URL_MONGO = `mongodb://${host_mongo}:${port_mongo}`
const TEST_DATABASE = 'test'
const TEST_COLLECTION = 'playground'
const MAIN_DATABASE = 'todos'
const USERS_COLLECTION = 'users'

// decorator
const collectionOperation = (
  databaseName: string,
  collectionName: string,
  func: MongoOperation) => async () => {
    const client = new MongoClient(URL_MONGO)
    try {
      // connect
      await client.connect()
      // get db and collection
      const collection = client.db(databaseName).collection(collectionName)
      // do opertion
      await func(collection)
    } finally {
      // close client
      await client.close()
    }
  }


// test
export const testMongoDb = collectionOperation(TEST_DATABASE, TEST_COLLECTION,
  async (collection: Collection) => {
    // try create
    await collection.insertOne({ message: 'Successfully inserted one new entry.' })
    // try read
    const result = await collection.findOne({})
    console.log(result)
  }
)

// insert user
export const insertUser = async () => {

}
