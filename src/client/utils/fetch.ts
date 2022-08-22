import { Todo, Token } from "../types"
import { FetchResult } from '../../types'


export const renewToken = async (url: string, refreshToken: Token): Promise<FetchResult> => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken })
  })
  const body = await res.json()

  return {
    status: res.status,
    message: body.message,
  }
}

export const fetchTodos = async (): Promise<FetchResult<Todo[] | null>> => {
  const res = await fetch('/api/todos', { method: 'POST' })
  const body = await res.json()

  return {
    status: res.status,
    message: body.message,
    payload: res.status === 200 ? body : null
  }
}
