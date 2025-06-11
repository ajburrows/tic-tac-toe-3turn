import { GAME_CONFIG } from '../config/game'

export function useGameMoves(gameState, setGameState, changePlayer, intervalRef) {
  const makeMove = (index) => {
    if (gameState.p1Moves.includes(index) || gameState.p2Moves.includes(index)) return
    
    if (intervalRef.current) clearInterval(intervalRef.current)
    
    if (gameState.curMove === 0) {
      const updatedMoves = [gameState.p1Moves[1], gameState.p1Moves[2], index]
      setGameState(prev => ({ ...prev, p1Moves: updatedMoves }))
      const winCombo = checkWin(updatedMoves)
      if (winCombo) {
        setGameState(prev => ({ ...prev, p1Score: prev.p1Score + 1, winningLine: winCombo }))

        setTimeout(() => {
          setGameState(prev => ({ ...prev, winningLine: [] }))
        }, 600)

        if (gameState.p1Score >= GAME_CONFIG.POINTS_TO_WIN - 1) return
      }
    } else {
      const updatedMoves = [gameState.p2Moves[1], gameState.p2Moves[2], index]
      setGameState(prev => ({ ...prev, p2Moves: updatedMoves }))
      const winCombo = checkWin(updatedMoves)
      if (winCombo) {
        setGameState(prev => ({ ...prev, p2Score: prev.p2Score + 1, winningLine: winCombo }))

        setTimeout(() => {
          setGameState(prev => ({ ...prev, winningLine: [] }))
        }, 600)

        if (gameState.p2Score >= GAME_CONFIG.POINTS_TO_WIN - 1) return
      }
    }
    changePlayer()
  }

  const checkWin = (playerMoves) => {
    for (const combo of GAME_CONFIG.WINNING_COMBOS) {
      if (combo.every(index => playerMoves.includes(index))) {
        return combo
      }
    }
    return null
  }

  return { makeMove }
} 