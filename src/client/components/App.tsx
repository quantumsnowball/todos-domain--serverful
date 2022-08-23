import { useCallback, useEffect } from 'react'
import MenuBar from './MenuBar'
import Main from './Main'
import { createTheme, styled, ThemeProvider } from '@mui/material'
import chooseTheme from '../styles/theme'
import { CenterContent } from './styled/containers'
import { BrowserRouter } from 'react-router-dom'


const FlexColumnDiv = styled(CenterContent('div'))`
  /* cover full viewport */
  height: 100vh;
  max-height: 100vh;
  justify-content: space-between;
  /* theme */
  color: ${props => props.theme.palette.text.primary};
  background-color: ${props => props.theme.palette.background.default};
`

function App() {
  const mode = 'dark'
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

