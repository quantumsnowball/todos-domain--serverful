// import { StyledComponent } from '@emotion/styled'
// import { Theme, } from '@mui/material'
// import { MUIStyledCommonProps } from '@mui/system'
import { styled } from '@mui/material'


// type Element = StyledComponent<MUIStyledCommonProps<Theme>, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>
type Element = any
type Styler = (e: Element) => Element

export const Stretch: Styler = e => styled(e)`
  /* take all vertical flex space from parents */
  flex-grow: 1;
`

export const CenterContent: Styler = e => styled(e)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-content: center;
  text-align: center;
`


