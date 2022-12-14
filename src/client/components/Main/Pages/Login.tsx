import { Button, FormControl, styled, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { tokenActions } from '../../../redux/slices/tokenSlice'
import { CenterContent, Stretch } from '../../styled/containers'


const Div = styled(Stretch(CenterContent('div')))`
  /* layout */
  width: 30vw;
  height: 35vh;
`

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
      if (res.status === 200) {
        dispatch(tokenActions.setRefreshToken(body.refreshToken))
        navigate('/')
      } else {
        alert(body.message)
      }

    } catch (error) {
      alert(error)
    }
  }

  const handleClear = () => {
    setEmail('')
    setPassword('')
  }

  return (
    <Div className="login-ctn">
      <Typography
        variant="h4"
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
        to="/register"
        sx={{ alignSelf: 'flex-start' }}
      >
        Register
      </Button>
      <Typography variant="h4">or</Typography>
      <form action='/api/login-google'>
        <Button
          fullWidth
          variant="contained"
          color="success"
          sx={{ p: 1 }}
          type='submit'
        >
          Login with Google
        </Button>
      </form>
    </Div>
  )
}

