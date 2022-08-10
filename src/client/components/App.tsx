import { useCallback, useEffect } from 'react'
import MenuBar from './MenuBar'
import Main from './Main'
import { createTheme, styled, ThemeProvider } from '@mui/material'
import chooseTheme from '../styles/theme'
import { BrowserRouter } from 'react-router-dom'


const FlexColumnDiv = styled('div')`
  /* cover full viewport */
  width: 100vw;
  height: 100vh;
  /* flex column display sections */
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  /* theme */
  color: ${props => props.theme.palette.text.primary};
  background-color: ${props => props.theme.palette.background.default};
`

function App() {
  const mode = 'light'
  const name = 'elementary'
  const theme = useCallback(() => createTheme(chooseTheme(name)(mode)), [name, mode])

  useEffect(() => {
    document.body.style.backgroundColor = theme().palette.background.default
  }, [theme])

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <FlexColumnDiv className="app-ctn">
          <MenuBar />
          <Main />
        </FlexColumnDiv>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

