// import { StyledComponent } from '@emotion/styled'
// import { Theme, } from '@mui/material'
// import { MUIStyledCommonProps } from '@mui/system'
import { styled } from '@mui/material'


// type Element = StyledComponent<MUIStyledCommonProps<Theme>, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>
type Element = any
type Styler = (e: Element) => Element

export const Overflow: Styler = e => styled(e)`
  /* should allow children to overflow by creating a scroll bar itself and keep its height constant */
  overflow: auto;
`;

export const Stretch: Styler = e => styled(e)`
  width: 100%;
  /* take all vertical flex space from parents */
  flex-grow: 1;
`;

export const CenterContent: Styler = e => styled(e)`
  /* self */
  align-self: center;
  /* children */
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-content: center;
  align-items: stretch;
  text-align: center;
`;

