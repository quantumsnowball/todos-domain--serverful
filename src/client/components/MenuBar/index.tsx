import {
  AppBar, Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  Button,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'


function MenuBar() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate()

  return (
    <AppBar position={isMobile ? "fixed" : "static"}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          TODOs
        </Typography>
        <Button
          color="inherit"
          onClick={() => navigate('/login')}
        >Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default MenuBar

