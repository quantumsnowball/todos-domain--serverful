export interface Todo {
  title: string,
  content: string
}

export interface _Id {
  _id: string
}

export type TodoWithId = Todo & _Id

