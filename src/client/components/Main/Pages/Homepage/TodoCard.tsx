import {
  styled,
  Card, Typography,
  IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Stretch } from '../../../styled/containers'


const FlexCard = styled(Card)`
  display: flex;
`

const ContentDiv = Stretch('div')

interface TodoCardProps {
  _id: string
  title: string,
  content: string
}

export default function TodoCard({ _id, title, content }: TodoCardProps) {
  return (
    <FlexCard sx={{ margin: '5px', padding: '5px' }}>
      <ContentDiv>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="h6">{content}</Typography>
      </ContentDiv>
      <IconButton
        size="large"
        onClick={e => console.log({ _id })}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </FlexCard>
  )
}

