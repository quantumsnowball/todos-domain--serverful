import { Link } from 'react-router-dom'
import { RootState } from '../../../../redux/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Todo } from '../../../../types'
import { useState, useEffect } from 'react'


export default function Homepage() {
  const refreshToken = useSelector((s: RootState) => s.token.refreshToken)
  const [tokenHasUpdated, setTokenHasUpdated] = useState(0)
  const [todosUser, setTodosUser] = useState('')
  const [todos, setTodos] = useState<Todo[]>([{ title: 'item0', content: 'item0' }])
  const navigate = useNavigate()

  const renewToken = async (url: string) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken })
    })
    if (res.status === 200) {
      return true
    } else {
      console.log(await res.json())
      return false
    }
  }

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('/api/todos', { method: 'POST' })
      // access token is invalid
      if (res.status === 401) {
        const body = await res.json()
        console.log(body)
        const renewResult = await renewToken(body.url)
        if (renewResult) {
          // trigger fetchTodos() to run again to get the todos list
          setTokenHasUpdated(Date.now())
        } else {
          // renew from server failed, need a new refresh token, navigate to /login
          navigate('/login')
        }
        return
      }
      // access token is valid, but failed to read todo for other reasons
      if (res.status !== 200) {
        console.log(await res.json())
        return
      }
      // successfully fetch todos list 
      const { user, todos } = await res.json()
      setTodosUser(user)
      setTodos(todos)
    }
    fetchTodos()
  }, [tokenHasUpdated])

  return (
    <div>
      {refreshToken ?
        <>
          <h3>Todos for {todosUser}:</h3>
          {todos.map((todo: Todo) => <div key={todo.title}>{todo.title}: {todo.content}</div>)}
        </>
        :
        <h1>Please <Link to="/login">Login</Link> to view your Todo list. </h1>}
    </div>
  )
}

