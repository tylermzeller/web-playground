import * as chess from 'chess.js'

// details of verbose history -> https://github.com/jhlywa/chess.js/blob/master/README.md
export const fullHistory = (verboseHistory, startingPosition) => {
  const history = []
  const referenceGame = new Chess(startingPosition)
  for (const move of verboseHistory) {
    referenceGame.move(move)
    history.push(referenceGame.fen())
  }
  return history
}