import React from 'react'
import styled from 'styled-components'
import {BodyCenter} from './structure/Body'
import {themeColor1, themeColor5} from './configure'
import {StandardChessboard} from './chess/StandardChessboard'

export const ContentMarkup = (props) => {
  return (
    <BodyCenter
      {...props}
    >
      <StandardChessboard id='board' width={700} />
    </BodyCenter>
  )
}

export const Content = styled(ContentMarkup)`
  background-color: ${props => props.theme ? props.theme.themeColor1 : themeColor1};
  color: ${props => props.theme ? props.theme.themeColor5 : themeColor5};
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`
