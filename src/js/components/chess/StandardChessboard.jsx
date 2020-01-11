import React, {useEffect, useState} from 'react'
import * as Chess from 'chess.js'
import {Chessboard} from './Chessboard'
import {fullHistory} from '../../utils/chess'
import {ChessMoveChannel, NewGameChannel} from '../configure'

const START_POS = new Chess().fen()

export const StandardChessboard = ({width, startPosition = START_POS, id, chessGame}) => {
  const [chess] = useState(chessGame || new Chess(startPosition))
  useEffect(() => {
    NewGameChannel.publish({startPosition, history: fullHistory(chess.history({ verbose: true }), startPosition)})
  }, [])

  return (
    <Chessboard
      id={id}
      width={width}
      startPosition={startPosition}
      onMove={move => {
        const result = chess.move(move)
        if (result) {
          // publish move to move channel
          ChessMoveChannel.publish({
            type: 'move',
            san: move.san,
            fen: chess.fen(),
            color: move.color,
            move
          })
        }
        return chess.fen().split(' ')[0]
      }}
    />
  )
}