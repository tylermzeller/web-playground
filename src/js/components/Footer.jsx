import styled from 'styled-components'
import {AppFooter} from './structure/App'
import {themeColor1, themeColor5} from './configure'

export const Footer = styled(AppFooter)`
  height: ${props => props.height || 50}px;
  background-color: ${props => props.theme ? props.theme.themeColor1 : themeColor1};
  color: ${props => props.theme ? props.theme.themeColor5 : themeColor5};
`