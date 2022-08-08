import { Routes, Route, BrowserRouter, Link } from 'react-router-dom'


function Homepage() {
  return (
    <div>
      <h1>Homepage</h1>
      <br />
      <Link to="/register">Register</Link>
      <br />
      <Link to="/login">Login</Link>
    </div>
  )
}

function Register() {
  return (
    <div>
      <h1>Register</h1>
      <br />
      <Link to="/">back</Link>
    </div>
  )
}

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <br />
      <form onSubmit={() => alert('submit the form')} method="POST">
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

