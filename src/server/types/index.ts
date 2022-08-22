import { Collection } from 'mongodb'


export interface User {
  email: string,
}

export interface UserWithPassword extends User {
  hashedPassword: string
}

export interface UserFilter {
  user: string
}

export interface Todo extends UserFilter {
  title: string,
  content: string
}

export interface TokenPayload extends UserFilter {
  id: number,
}

export type MongoOperation<R, P> = (client: Collection, payload?: P) => Promise<R>
