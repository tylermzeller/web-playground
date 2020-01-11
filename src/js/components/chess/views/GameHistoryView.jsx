import React from 'react'
import styled from 'styled-components'
import {FlexCol, FlexRow} from '../../../utils/components'
import {pairwise} from '../../../utils/javascript'
import {themeColor1, themeColor5} from '../../configure'

const GameHistoryWrapper = styled(FlexCol)

const GameHistoryRow = styled(FlexRow)

const GameHistoryCell = styled.div`
  background-color: ${props => props.color === 'w' ? themeColor1 : themeColor5};
  color: ${props => props.color === 'w' ? themeColor5 : themeColor1};
`

const makeHistoryCell = move => (
  <GameHistoryCell
    key={move.fen + move.move}
    color={move.color}
    onClick={() => console.log('emit historical fen')}
  >
    {move.move}
  </GameHistoryCell>
)

const makeHistoryRow = movePair => (
  <GameHistoryRow
    key={movePair.map(m => m.fen).join('')}
  >
    {movePair.map(makeHistoryCell)}
  </GameHistoryRow>
)

/**
 * @param history - like [{move: 'e4', color: 'w', fen: ...}, ...]
 */
export const GameHistoryView = ({history}) => {
  return (
    <GameHistoryWrapper>
      {pairwise(history).map(makeHistoryRow)}
    </GameHistoryWrapper>
  )
}