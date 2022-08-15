import dotenv from 'dotenv'
import { MongoClient, Collection } from 'mongodb'
import { MongoOperation, User } from '../types'


// env
dotenv.config()
const host_mongo = process.env.HOST_MONGO
const port_mongo = process.env.PORT_MONGO

// globals
const URL_MONGO = `mongodb://${host_mongo}:${port_mongo}`

// operation decorator
const operation = <T>(func: MongoOperation<T>) =>
  async (databaseName: string, collectionName: string, payload?: any): Promise<T> => {
    const client = new MongoClient(URL_MONGO)
    try {
      // connect
      await client.connect()
      // get db and collection
      const collection = client.db(databaseName).collection(collectionName)
      // do opertion
      return await func(collection, payload)
    }
    catch (error) {
      console.log(error)
    }
    finally {
      // close client
      await client.close()
    }
  }

// test
const test = operation(
  async (collection: Collection) => {
    // try create
    await collection.insertOne({ message: 'Successfully inserted one new entry.' })
    // try read
    const result = await collection.findOne({})
    console.log(result)
  }
)

// insert user
const insertUser = operation(
  async (collection: Collection, user: User) => {
    await collection.insertOne(user)
    return true
  }
)

// find user
const findUser = operation(
  async (collection: Collection, user: User) => {
    return await collection.findOne<User>(user)
  }
)

export default {
  test,
  insertUser,
  findUser
}
