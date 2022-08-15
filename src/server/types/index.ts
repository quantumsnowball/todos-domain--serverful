import { Collection } from 'mongodb'


export interface User {
  email: string,
}

export interface UserWithPassword extends User {
  hashedPassword: string
}

export interface TokenPayload {
  id: number,
  user: string
}

export type MongoOperation<R, P> = (client: Collection, payload?: P) => Promise<R>
