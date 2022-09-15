import { useCallback, useEffect } from 'react'
import MenuBar from './MenuBar'
import Main from './Main'
import { createTheme, styled, ThemeProvider } from '@mui/material'
import chooseTheme from '../styles/theme'
import { CenterContent } from './styled/containers'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider, useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { tokenActions } from '../redux/slices/tokenSlice'


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
  const dispatch = useDispatch()
  const mode = 'light'
  const name = 'elementary'
  const theme = useCallback(() => createTheme(chooseTheme(name)(mode)), [name, mode])
  const [cookies, _, removeCookie] = useCookies(['refreshToken', 'message'])

  useEffect(() => {
    document.body.style.backgroundColor = theme().palette.background.default
  }, [theme])

  // grap if there is a refresh token in cookie
  useEffect(() => {
    if (cookies.refreshToken) {
      dispatch(tokenActions.setRefreshToken(cookies.refreshToken))
      removeCookie('refreshToken')
    }
  }, [])

  // display message if there is a message in cookie
  useEffect(() => {
    if (cookies.message) {
      alert(cookies.message)
      removeCookie('message')
    }
  }, [])


  return (
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <BrowserRouter>
          <FlexColumnDiv className="app-ctn">
            <MenuBar />
            <Main />
          </FlexColumnDiv>
        </BrowserRouter>
      </CookiesProvider>
    </ThemeProvider>
  )
}

export default App

