import {
  styled,
  Button,
  TextField
} from "@mui/material"
import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import { Todo } from "../../../../types"


const Div = styled('div')`
  align-self: stretch;
`

export default function TodoCreater() {
  const [todoDraft, setTodoDraft] = useState('')
  const navigate = useNavigate()

  const onAddTodo = async () => {
    const title = todoDraft
    const todo: Todo = { title, content: '' }
    const res = await fetch('/api/todos', {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo)
    })
    // access token is invalid
    if (res.status === 401) {
      navigate('/login')
      return
    }

    if (res.status !== 200) {
      console.log(await res.json())
      return
    }

    console.log(await res.json())
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

