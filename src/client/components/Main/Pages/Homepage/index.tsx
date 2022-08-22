import { v4 } from 'uuid'
import { Link } from 'react-router-dom'
import { RootState } from '../../../../redux/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Todo } from '../../../../../types'
import { useState, useEffect } from 'react'
import TodoCreator from './TodoCreater'
import { getTodos, renewToken } from '../../../../utils/fetch'
import {
  styled,
  Typography
} from '@mui/material'


const TodosDiv = styled('div')`
  width: 100%;
  flex-grow: 1;
  align-self: center;
`

export default function Homepage() {
  const refreshToken = useSelector((s: RootState) => s.token.refreshToken)
  const [tokenHasUpdated, setTokenHasUpdated] = useState(0)
  const [todos, setTodos] = useState<Todo[]>([{ title: 'item0', content: 'item0' }])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTodos = async () => {
      const todosResult = await getTodos()
      // access token is invalid
      if (todosResult.status === 401) {
        console.log(todosResult.message)
        const renewResult = await renewToken(refreshToken)
        if (renewResult.status === 200) {
          // trigger fetchTodos() to run again to get the todos list
          setTokenHasUpdated(Date.now())
        } else {
          // renew from server failed, need a new refresh token, navigate to /login
          navigate('/login')
        }
        return
      }
      // access token is valid, but failed to read todo for other reasons
      if (todosResult.status !== 200) {
        console.log(todosResult.message)
        return
      }
      // successfully fetch todos list 
      const todos = todosResult.payload
      if (todos)
        setTodos(todos)
    }
    fetchTodos()
  }, [tokenHasUpdated])

  return (
    <>
      {refreshToken ?
        <TodosDiv>
          <TodoCreator />
          {todos.map((todo: Todo) => <div key={v4()}>{todo.title}: {todo.content}</div>)}
        </TodosDiv>
        :
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          Please <Link to="/login">Login</Link> to view your Todo list.
        </Typography>}
    </>
  )
}

