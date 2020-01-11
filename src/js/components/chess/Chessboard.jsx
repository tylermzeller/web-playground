import React, {useEffect} from 'react'
import styled from 'styled-components'
import range from 'lodash/range'
import {getElement} from '../../utils/dom'
import ImageCache from './ImageCache'
import {NO_OP} from '../../utils/javascript'

// TODO decouple canvas from logic
const PIECE_NAMES = [
  'bB',
  'bK',
  'bN',
  'bP',
  'bQ',
  'bR',
  'wB',
  'wK',
  'wN',
  'wP',
  'wQ',
  'wR',
]

const pieceNameToAssetPath = name => `../../../assets/pieces/cburnett/${name}.svg`
const pieceNametoFENNotation = name => name[0] === 'w' ? name[1] : name[1].toLowerCase()
const pieceFENNames = PIECE_NAMES
  .map(pieceNametoFENNotation)
const pieceNamePathEntries = PIECE_NAMES
  .map(name => [pieceNametoFENNotation(name), pieceNameToAssetPath(name)])
const pieceImageCache = new ImageCache(Object.fromEntries(pieceNamePathEntries))

const DARK_SQUARE_COLOR = '#b58763'
const LIGHT_SQUARE_COLOR = '#f0d8b5'
const CHESSBOARD_ID = 'chessboard'

let dragging = false
let hoverSquare = null
let dragSquare = null
let mouseX = 0
let mouseY = 0
let boardState = {}

const stateToFEN = () => {
  let ranks = []
  for (let i of range(8)) {
    let rank = ''
    let emptyCount = 0
    for (let j of range(8)) {
      const square = i * 8 + j
      if (String(square) in boardState) {
        if (emptyCount > 0) {
          rank += emptyCount
          emptyCount = 0
        }
        rank += boardState[square]
      } else {
        emptyCount += 1
      }
    }
    if (emptyCount > 0) {
      rank += emptyCount
    }
    ranks.push(rank)
  }
  return ranks.join('/')
}

const FENToState = (fen) => {
  const state = {}
  let square = 0
  for (let c of fen) {
    if (c === '/') {
      continue
    }
    if (pieceFENNames.includes(c)) {
      state[square] = c
    } else {
      square += parseInt(c) - 1 // we add 1 later
    }
    square += 1
  }
  return state
}

const squareToCoordinate = (square, turn = 'w') => {
  // 0 -> a8, 63 -> h1 (from white's perspective), and so on
  const i = Math.floor(square / 8)
  const j = square % 8

  const iNorm = turn === 'w' ? 8 - i : i + 1
  const jNorm = turn === 'w' ? j : 7 - j

  return String.fromCharCode(97 + jNorm) + iNorm
}

const drawImage = (ctx, img, square, squareLength) => {
  const i = Math.floor(square / 8)
  const j = square % 8
  let x, y
  if (square === dragSquare) {
    x = mouseX - (squareLength / 2)
    y = mouseY - (squareLength / 2)
  } else {
    x = j * squareLength
    y = i * squareLength
  }
  ctx.drawImage(img, x, y, squareLength, squareLength)
}

const drawChessboard = canvas => {
  const ctx = canvas.getContext('2d')
  window.requestAnimationFrame(() => drawChessboard(canvas))
  ctx.fillStyle = LIGHT_SQUARE_COLOR
  const squareLength = canvas.width / 8
  for (let i of range(8)) {
    for (let j of range(8)) {
      if (j !== 0) {
        if (ctx.fillStyle === LIGHT_SQUARE_COLOR) {
          ctx.fillStyle = DARK_SQUARE_COLOR
        } else {
          ctx.fillStyle = LIGHT_SQUARE_COLOR
        }
      }
      ctx.fillRect(j * squareLength, i * squareLength, squareLength, squareLength)
    }
  }

  // Draw piece where order doesn't matter
  for (let square in boardState) {
    if (!boardState.hasOwnProperty(square)) {
      continue
    }
    square = parseInt(square) // square should be a number in [0-63], but keys are strings
    // we will wait to draw the dragging piece last
    if (square === dragSquare) {
      continue
    }
    const img = pieceImageCache.getImage(boardState[square])
    if (img.loaded) {
      drawImage(ctx, img, square, squareLength)
    } else {
      img.addEventListener('load', () => {
        drawImage(ctx, img, square, squareLength)
      })
    }
  }

  // draw the dragged piece last so it renders above the other pieces
  if (dragSquare in boardState) {
    drawImage(ctx, pieceImageCache.getImage(boardState[dragSquare]), dragSquare, squareLength)
  }
}

const getSquareFromXY = (x, y, boardSize) => {
  const i = Math.floor((y / boardSize) * 8)
  const j = Math.floor((x / boardSize) * 8)
  let square = null
  if (i >= 0 && i < 8 && j >= 0 && j < 8) {
    square = i * 8 + j
  }
  return square
}

const addPointerEvents = (canvas, onMove = NO_OP) => {

  canvas.addEventListener('mousedown', e => {
    const canvasX = e.clientX - canvas.offsetLeft
    const canvasY = e.clientY - canvas.offsetTop
    const square = getSquareFromXY(canvasX, canvasY, canvas.width)
    dragSquare = square
    dragging = true
  })

  canvas.addEventListener('mouseup', e => {
    const canvasX = e.clientX - canvas.offsetLeft
    const canvasY = e.clientY - canvas.offsetTop
    const square = getSquareFromXY(canvasX, canvasY, canvas.width)
    if (String(dragSquare) in boardState) {
      const from = squareToCoordinate(dragSquare)
      const to = squareToCoordinate(square)
      const newFEN = onMove({from, to})
      boardState = FENToState(newFEN)
    }
    dragSquare = null
    dragging = false
  })

  canvas.addEventListener('mousemove', e => {
    const canvasX = e.clientX - canvas.offsetLeft
    const canvasY = e.clientY - canvas.offsetTop
    const square = getSquareFromXY(canvasX, canvasY, canvas.width)
    hoverSquare = square
    mouseX = canvasX
    mouseY = canvasY
  })

  canvas.addEventListener('mouseout', e => {
    dragging = false
    dragSquare = null
    hoverSquare = null
  })

}

const ChessboardCanvas = styled.canvas`
  border: 1px solid ${props => props.theme ? props.theme.themeColor5 : props.themeColor5};
`

export const Chessboard = ({width, startPosition, onMove, id = CHESSBOARD_ID}) => {
  useEffect(() => {
    const canvas = getElement(`#${id}`)
    if (canvas.getContext) {
      boardState = FENToState(startPosition)
      addPointerEvents(canvas, onMove || NO_OP)
      drawChessboard(canvas)
    }
  }, [])

  return (
    <ChessboardCanvas id={id} width={width} height={width} />
  )
}