import { Collection } from 'mongodb'


export interface User {
  email: string,
  hashedPassword: string
}

export interface TokenPayload {
  id: number,
  user: string
}

export type MongoOperation<T> = (client: Collection, payload?: any) => Promise<T>
