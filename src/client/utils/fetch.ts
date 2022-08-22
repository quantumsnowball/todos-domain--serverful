import { Todo } from '../../types'
import { FetchBody, Token } from '../types'
import { FetchResult } from '../types'


export const renewToken = async (refreshToken: Token): Promise<FetchResult> => {
  const res = await fetch('/api/renew', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken })
  })
  const body = await res.json()

  const status = res.status
  const message = body.message

  return { status, message }
}

export const getTodos = async (): Promise<FetchResult<Todo[]>> => {
  const res = await fetch('/api/todos', { method: 'POST' })
  const body: FetchBody<Todo[]> = await res.json()

  const status = res.status
  const message = body.message
  const payload = status === 200 ? body.payload : undefined

  return { status, message, payload }
}
