import styled from 'styled-components'
import {AppHeader} from './structure/App'
import {themeColor2, themeColor5} from './configure'

export const Header = styled(AppHeader)`
  height: ${props => props.height || 50}px;
  background-color: ${props => props.theme ? props.theme.themeColor2 : themeColor2};
  color: ${props => props.theme ? props.theme.themeColor5 : themeColor5};
`
