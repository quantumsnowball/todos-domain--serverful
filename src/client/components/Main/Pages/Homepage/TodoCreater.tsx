import {
  styled,
  Button,
  TextField
} from "@mui/material"
import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import { Todo } from "../../../../../types"
import { addTodos, renewToken } from "../../../../utils/fetch"
import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"


const Div = styled('div')`
  align-self: stretch;
`

export default function TodoCreater() {
  const refreshToken = useSelector((s: RootState) => s.token.refreshToken)
  const [todoDraft, setTodoDraft] = useState('')
  const navigate = useNavigate()

  const onAddTodo = async () => {
    const title = todoDraft
    const todo: Todo = { title, content: '' }
    const addResult = await addTodos(todo)

    // access token is invalid
    if (addResult.status === 401) {
      console.log(addResult.message)
      const renewResult = await renewToken(refreshToken)
      if (renewResult.status === 200) {
        // trigger fetchTodos() to run again to get the todos list
        await onAddTodo()
      } else {
        // renew from server failed, need a new refresh token, navigate to /login
        navigate('/login')
      }
      return
    }

    // access token is valid, but failed to add todo for other reasons
    if (addResult.status !== 200) {
      console.log(addResult.message)
      return
    }

    // add result successful, trigger page refresh
  }

  return (
    <Div>
      <TextField
        value={todoDraft}
        onChange={e => setTodoDraft(e.target.value)} />
      <Button variant="contained"
        onClick={onAddTodo}
      >ADD</Button>
    </Div>
  )
}

