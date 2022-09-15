import crypto from 'crypto'
import dotenv from 'dotenv'
import { MongoClient, Collection, ObjectId } from 'mongodb'
import { _Id } from '../../types'
import { MongoOperation, PendingUser, TodoDocument, User, UserFilter, UserWithPassword } from '../types'


// env
dotenv.config()
console.log({ NODE_ENV: process.env.NODE_ENV })
const URL_MONGO = process.env.NODE_ENV === 'production' ?
  process.env.URL_MONGO_PROD : process.env.URL_MONGO_DEV

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

// insert pending user
const upsertPendingUser = operation(
  async (collection: Collection, filter: PendingUser) => {
    await collection.deleteMany({ email: filter.email })
    await collection.insertOne(filter)
  }
)

// find pending user
const findPendingUser = operation(
  async (collection: Collection, filter: User) => {
    return await collection.findOne<PendingUser>(filter)
  }
)

// delete pending users
const deletePendingUsers = operation(
  async (collection: Collection, filter: User) => {
    return await collection.deleteMany(filter)
  }
)

// insert user
const insertUser = operation(
  async (collection: Collection, filter: UserWithPassword) => {
    await collection.insertOne(filter)
  }
)

// upsert oauth user
const upsertOAuthUser = operation(
  async (collection: Collection, filter: User) => {
    await collection.updateOne(filter, { $setOnInsert: filter }, { upsert: true })
  }
)

// find user
const findUser = operation(
  async (collection: Collection, filter: User) => {
    return await collection.findOne<UserWithPassword>(filter)
  }
)

// insert todo
const insertTodo = operation(
  async (collection: Collection, doc: TodoDocument) => {
    await collection.insertOne(doc)
  }
)

// delete todo
const deleteTodo = operation(
  async (collection: Collection, filter: _Id) => {
    const result = await collection.deleteOne({ _id: new ObjectId(filter._id) })
  }
)

// find todo
const findTodos = operation(
  async (collection: Collection, filter: UserFilter) => {
    const cursor = collection.find<User>(filter, { projection: { title: 1, content: 1 } })
    const found = await cursor.toArray()
    return found
  }
)

export default {
  test,
  upsertPendingUser,
  findPendingUser,
  deletePendingUsers,
  insertUser,
  upsertOAuthUser,
  findUser,
  insertTodo,
  deleteTodo,
  findTodos
}
