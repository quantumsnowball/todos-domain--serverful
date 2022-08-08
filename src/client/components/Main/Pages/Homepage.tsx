import { Link } from 'react-router-dom'


export default function Homepage() {
  return (
    <div>
      <h1>Todos</h1>
      <br />
      <Link to="/register">Register</Link>
      <br />
      <Link to="/login">Login</Link>
    </div>
  )
}

