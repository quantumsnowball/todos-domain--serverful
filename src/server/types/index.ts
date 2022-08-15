import { Collection } from 'mongodb'


export interface User {
  email: string,
  hashedPassword: string
}

export interface TokenPayload {
  id: number,
  user: string
}

export type MongoOperation = (client: Collection, payload?: any) => Promise<void>
