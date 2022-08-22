import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import Register from './Pages/Register'
import Login from './Pages/Login'
import NotFound from './Pages/NotFound'
import { Stretch, CenterContent } from '../styled/containers'
import { styled } from '@mui/material'


// .main-ctn
const CenteredDiv = styled(Stretch(CenterContent('div')))`
  /* take all horizontal space */
  width: 100%;
`

export default function Main() {
  return (
    <CenteredDiv className='main-ctn'>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CenteredDiv>
  )
}

