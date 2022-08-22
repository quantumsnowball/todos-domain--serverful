import {
  styled,
  TextField
} from "@mui/material"


const Div = styled('div')`
  align-self: stretch;
`

function TodoCreater() {
  return (
    <div>
      <TextField fullWidth />
    </div>
  )
}

export default TodoCreater
