import { Link } from 'react-router-dom'
import { RootState } from '../../../../redux/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Todo, TodoWithId } from '../../../../../types'
import { useEffect } from 'react'
import TodoCreator from './TodoCreater'
import { getTodos, renewToken } from '../../../../utils/fetch'
import {
  styled,
  Typography
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { contentActions } from '../../../../redux/slices/contentSlice'
import TodoCard from './TodoCard'
import { CenterContent, Stretch } from '../../../styled/containers'


const ScrollableDiv = styled(Stretch(CenterContent('div')))`
  /* allow scrollbar here*/
  overflow: auto;
  /* text */
  text-align: left;
`

const TodosDiv = styled(Stretch('div'))`
  width: 100%;
  align-self: center;
`

const LoggedOutDiv = Stretch(CenterContent(styled('div')`
  width: 100%;
`))

export default function Homepage() {
  const refreshToken = useSelector((s: RootState) => s.token.refreshToken)
  const todos = useSelector((s: RootState) => s.content.todos)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTodos = async () => {
      const getResult = await getTodos()
      // access token is invalid
      if (getResult.status === 401) {
        console.log(getResult.message)
        const renewResult = await renewToken(refreshToken)
        if (renewResult.status === 200) {
          // trigger fetchTodos() to run again to get the todos list
          await fetchTodos()
        } else {
          // renew from server failed, need a new refresh token, navigate to /login
          navigate('/login')
        }
        return
      }
      // access token is valid, but failed to read todo for other reasons
      if (getResult.status !== 200) {
        console.log(getResult.message)
        return
      }
      // successfully fetch todos list 
      const todos = getResult.payload
      if (todos)
        dispatch(contentActions.setTodos(todos))
    }
    fetchTodos()
  }, [])

  return (
    <>
      {refreshToken ?
        <ScrollableDiv className='todos-ctn'>
          <TodosDiv>
            <TodoCreator />
            {todos.map((todo: TodoWithId) => <TodoCard key={todo._id} {...todo} />)}
          </TodosDiv>
        </ScrollableDiv>
        :
        <LoggedOutDiv>
          <Typography variant="h5">
            Please <Link to="/login">Login</Link> to view your Todo list.
          </Typography>
        </LoggedOutDiv>
      }
    </>
  )
}

