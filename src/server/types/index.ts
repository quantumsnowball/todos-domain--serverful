import { Collection } from 'mongodb'
import { Todo } from '../../types'


export interface User {
  email: string,
}

export interface UserWithPassword extends User {
  hashedPassword: string
}

export interface UserFilter {
  user: string
}

export type TodoDocument = UserFilter & Todo

export interface TokenPayload extends UserFilter {
  id: number,
}

export type MongoOperation<R, P> = (client: Collection, payload?: P) => Promise<R>
