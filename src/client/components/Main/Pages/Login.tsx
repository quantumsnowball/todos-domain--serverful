import { Link } from 'react-router-dom'


export default function Login() {
  const handleSubmit = () => {
    () => alert('submit the form')
  }
  return (
    <div>
      <h1>Login</h1>
      <br />
      <form method="POST" action='/api/login'>
        <div>
          <label>Email:</label>
          <input id="email" name="email" type="email" />
        </div>
        <div>
          <label>Password:</label>
          <input id="password" name="password" type="password" />
        </div>
        <div>
          <input id="submit" type="submit" />
        </div>
      </form>
      <br />
      <Link to="/">back</Link>
    </div>
  )
}

