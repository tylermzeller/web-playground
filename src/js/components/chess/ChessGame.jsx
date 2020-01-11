import React from 'react'
import styled from 'styled-components'
import {FlexRow} from '../../utils/components'
import {GameHistory} from './GameHistory'

const ChessGameWrapper = styled(FlexRow)

export const ChessGame = ({chessboard}) => {
  return (
    <ChessGameWrapper>
      {chessboard}
      <GameHistory/>
    </ChessGameWrapper>
  )
}