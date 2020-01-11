import React, {useEffect, useState} from 'react'
import {GameHistoryView} from './views/GameHistoryView'
import {randomID} from '../../utils/javascript'
import {ChessMoveChannel, NewGameChannel} from '../configure'


export const GameHistory = props => {
  const [history, setHistory] = useState([])
  const [startingPosition, setStartingPosition] = useState(null)
  const id = randomID()
  useEffect(() => {

    NewGameChannel.subscribe(id, ({detail}) => {
      setStartingPosition(detail.startingPosition)
      setHistory(detail.history)
    })

    ChessMoveChannel.subscribe(id, ({detail}) => {
      setHistory(h => h.push(detail.move))
    })
    return () => {
      NewGameChannel.unsubscribe(id)
      ChessMoveChannel.unsubscribe(id)
    }
  }, [])
  return (
    <GameHistoryView
      history={history}
    />
  )
}