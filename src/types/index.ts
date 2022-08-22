export interface Todo {
  title: string,
  content: string
}

export interface TodoWithId extends Todo {
  _id: string
}
