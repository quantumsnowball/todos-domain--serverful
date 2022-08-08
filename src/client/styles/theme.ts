import { PaletteMode } from '@mui/material'
import { ThemeName } from '../types'


const elementary = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        // palette values for light mode
        background: {
          default: '#fafafa',
          paper: '#ffffff',
        },
      }
      : {
        // palette values for dark mode
        background: {
          default: '#303030',
          paper: '#424242',
        },
      }),
  },
})

const beach = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        // palette values for light mode
        background: {
          default: '#fff59d',
          paper: '#fff9c4',
        },
      }
      : {
        // palette values for dark mode
        background: {
          default: '#433d25',
          paper: '#484834',
        },
      }),
  },
})

const forest = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        // palette values for light mode
        primary: {
          main: '#2e7d32',
          light: '#4caf50',
          dark: '#1b5e20',
        },
        background: {
          default: '#81c784',
          paper: '#a5d6a7',
        },
      }
      : {
        // palette values for dark mode
        background: {
          default: '#0f3311',
          paper: '#173f1a',
        },
      }),
  },
})

const rose = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        // palette values for light mode
        primary: {
          main: '#ec407a',
          light: '#ffcdd2',
          dark: '#c62828',
        },
        background: {
          default: '#f48fb1',
          paper: '#ffcdd2',
        },
      }
      : {
        // palette values for dark mode
        background: {
          default: '#430f20',
          paper: '#4c1e1e',
        },
      }),
  },
})

const sunset = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        // palette values for light mode
        primary: {
          main: '#ed6c02',
          light: '#ff9800',
          dark: '#e65100',
        },
        background: {
          default: '#ff8a65',
          paper: '#ffab91',
        },
      }
      : {
        // palette values for dark mode
        background: {
          default: '#541200',
          paper: '#672309',
        },
      }),
  },
})

const ocean = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        // palette values for light mode
        background: {
          default: '#64b5f6',
          paper: '#90caf9',
        },
      }
      : {
        // palette values for dark mode
        background: {
          default: '#0d283d',
          paper: '#1f3e56',
        },
      }),
  },
})

const chooseTheme = (name: ThemeName) => ({
  elementary, beach, forest, rose, sunset, ocean
}[name])

export default chooseTheme

