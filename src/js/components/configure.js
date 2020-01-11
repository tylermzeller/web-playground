/*
  To change a component:
  1. Write a new component (e.g. MyNewSidebar.jsx)
  2. Import it below (e.g. `import {MyNewSidebar from './MyNewSidebar.jsx'}`)
  3. Set the export variable below to your new component
    (e.g. `export const LeftSidebar = MyNewSidebar`
 */

import {Header as CustomHeader} from './Header'
import {LeftSidebar as CustomLeftSidebar} from './Sidebar'
import {Content as CustomContent} from './Content'
import {NullComponent} from '../utils/components'
import {EventSource} from '../utils/events'
// import {Footer as CustomFooter} from './Footer'

export const HEADER_HEIGHT = 50
export const FOOTER_HEIGHT = 0
export const LEFT_SIDEBAR_WIDTH = 400

export const Header = CustomHeader
export const LeftSidebar = CustomLeftSidebar
export const Content = CustomContent
export const Footer = NullComponent

export const themeColor1 = '#F7F7FF'
export const themeColor2 = '#E5745E'
export const themeColor3 = '#279AF1'
export const themeColor4 = '#60656F'
export const themeColor5 = '#2D282B'

export const themes = {
  'default': {
    themeColor1,
    themeColor2,
    themeColor3,
    themeColor4,
    themeColor5,
  },
  'dark': {
    themeColor1: themeColor5,
    themeColor5: themeColor1,
    themeColor2,
    themeColor3,
    themeColor4,
  }
}

export const SidebarChannel = new EventSource('sidebar-events')
export const ChessMoveChannel = new EventSource('chess-move-events')
export const NewGameChannel = new EventSource('new-game-events')