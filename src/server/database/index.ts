import crypto from 'crypto'
import dotenv from 'dotenv'
import { MongoClient, Collection } from 'mongodb'
import { MongoOperation, User, UserWithPassword } from '../types'


// env
dotenv.config()
const host_mongo = process.env.HOST_MONGO
const port_mongo = process.env.PORT_MONGO

// globals
const URL_MONGO = `mongodb://${host_mongo}:${port_mongo}`

// operation decorator
const operation = <R, P>(func: MongoOperation<R, P>) =>
  async (databaseName: string, collectionName: string, payload?: P): Promise<R> => {
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
    const key = crypto.randomBytes(32).toString('hex')
    const filter = { key }
    const oldItem = { key, value: 0 }
    const newItem = { key, value: 1 }
    // try create
    await collection.insertOne(oldItem)
    console.log('CREATE: Success')
    // try read
    const r1 = await collection.findOne<typeof oldItem>(filter)
    console.log(`READ: ${r1.key === key ? 'Success' : 'Fail'}`)
    // try update
    collection.replaceOne(filter, newItem)
    const r2 = await collection.findOne({ key })
    console.log(`UPDATE: ${r2.key === key ? 'Success' : 'Fail'}`)
    // try delete
    collection.deleteOne(filter)
    const r3 = await collection.findOne({ key })
    console.log(`DELETE: ${r3 === null ? 'Success' : 'Fail'}`)
  }
)

// insert user
const insertUser = operation(
  async (collection: Collection, filter: UserWithPassword) => {
    await collection.insertOne(filter)
  }
)

// find user
const findUser = operation(
  async (collection: Collection, filter: User) => {
    return await collection.findOne<UserWithPassword>(filter)
  }
)

export default {
  test,
  insertUser,
  findUser
}
