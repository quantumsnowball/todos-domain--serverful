import { Link } from 'react-router-dom'
import { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'


export default function Homepage() {
  const refreshToken = useSelector((s: RootState) => s.token.refreshToken)

  return (
    <div>
      {refreshToken ?
        <h1>Fetch and show your todo list.</h1>
        :
        <h1>Please <Link to="/login">Login</Link> to view your Todo list. </h1>}
    </div>
  )
}

