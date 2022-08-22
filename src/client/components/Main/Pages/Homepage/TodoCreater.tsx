import {
  styled,
  Button,
  TextField
} from "@mui/material"
import { useState } from "react"


const Div = styled('div')`
  align-self: stretch;
`

function TodoCreater() {
  const [todoDraft, setTodoDraft] = useState('')

  const onAddTodo = () => {
    console.log(todoDraft)
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

export default TodoCreater
