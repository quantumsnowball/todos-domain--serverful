import { Card, Typography } from '@mui/material'


interface TodoCardProps {
  title: string,
  content: string
}

export default function TodoCard({ title, content }: TodoCardProps) {
  return (
    <Card sx={{ margin: '5px', padding: '5px' }}>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="h6">{content}</Typography>
    </Card>
  )
}

