import { Button, FormControl, styled, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const Div = styled('div')`
  /* layout */
  width: 30vw;
  max-width: 40vw;
  height: 35vh;
  max-height: 40vh;
  /* items */
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-item: flex-start;
  align-content: center;
`

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
    try {
      const body = await res.json()
      console.log(body.message)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClear = () => {
    setEmail('')
    setPassword('')
  }

  return (
    <Div>
      <Typography
        variant="h3"
        sx={{ textAlign: 'center' }}
      >Login</Typography>
      <FormControl>
        <TextField
          required
          id="outlined-required"
          name="email"
          type="email"
          label="Email"
          value={email}
          autoComplete="email"
          onChange={e => setEmail(e.target.value)}
          sx={{ m: 1 }}
        />
        <TextField
          id="outlined-password-input"
          name="current-password"
          type="password"
          label="Password"
          value={password}
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
          sx={{ m: 1 }}
        />
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{ m: 1 }}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleClear}
          sx={{ m: 1 }}
        >
          Clear
        </Button>
      </FormControl>
      <Button
        component={Link}
        to="/"
        sx={{ alignSelf: 'flex-start' }}
      >
        back
      </Button>
    </Div>
  )
}
