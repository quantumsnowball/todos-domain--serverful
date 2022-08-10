import { Link } from 'react-router-dom'
import { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'
import { Todo } from '../../../types'
import { useState, useEffect } from 'react'


export default function Homepage() {
  const refreshToken = useSelector((s: RootState) => s.token.refreshToken)
  const [todos, setTodos] = useState<Todo[]>([{ title: 'item0', content: 'item0' }])

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('/api/todos', { method: 'POST' })
      if (res.status !== 200) {
        alert('Your are logged out. Please login again.')
        return
      }
      const todos = await res.json()
      setTodos(todos)
    }
    fetchTodos()
  }, [])

  return (
    <div>
      {refreshToken ?
        todos.map((todo: Todo) => <div key={todo.title}>{todo.title}: {todo.content}</div>)
        :
        <h1>Please <Link to="/login">Login</Link> to view your Todo list. </h1>}
    </div>
  )
}

