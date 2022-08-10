import { Link } from 'react-router-dom'


export default function Homepage() {
  return (
    <div>
      <h1>Please <Link to="/login">Login</Link> to view your Todo list. </h1>
    </div>
  )
}

