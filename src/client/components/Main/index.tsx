import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import Register from './Pages/Register'
import Login from './Pages/Login'
import NotFound from './Pages/NotFound'
import { styled } from '@mui/material'


// .main-ctn
const ScrollableDiv = styled('div')`
  /* take all flex space from parents */
  flex-grow: 1;
  /* flex column display all quote cards */
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-item: stretch;
  align-content: center;
  /* allow scrollbar here*/
  overflow: auto;
  /* text */
  text-align: left;
`

export default function Main() {
  return (
    <ScrollableDiv className='main-ctn'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ScrollableDiv>
  )
}

