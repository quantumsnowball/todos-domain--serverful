import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import Register from './Pages/Register'
import Login from './Pages/Login'
import NotFound from './Pages/NotFound'
import { styled } from '@mui/material'


// .main-ctn
const CenteredDiv = styled('div')`
  /* padding */
  padding: 15px;
  /* take all horizontal space */
  width: 100%;
  /* take all vertical flex space from parents */
  flex-grow: 1;
  /* flex column display all quote cards */
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-item: stretch;
  align-content: center;
  /* allow scrollbar here*/
  overflow: auto;
  /* text */
  text-align: left;
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

