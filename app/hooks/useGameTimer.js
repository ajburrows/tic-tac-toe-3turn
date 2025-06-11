import { useEffect, useRef } from 'react'
import { GAME_CONFIG } from '../config/game'

export function useGameTimer(gameState, setGameState, changePlayer) {
  const intervalRef = useRef(null)

  // Stop the timer when the game ends
  useEffect(() => {
    if (gameState.gameOver && intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [gameState.gameOver])

  // Reset timer when a move is made
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver) return

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    // Reset the timer
    setGameState(prev => ({ ...prev, secondsLeft: GAME_CONFIG.TURN_DURATION }))

    // Start timer's countdown interval
    intervalRef.current = setInterval(() => {
      setGameState(prev => {
        const newSecondsLeft = Math.max(0, +(prev.secondsLeft - 0.1).toFixed(1))
        
        if (newSecondsLeft <= 0) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
          changePlayer()
          return { ...prev, secondsLeft: GAME_CONFIG.TURN_DURATION }
        }
        
        return { ...prev, secondsLeft: newSecondsLeft }
      })
    }, 100)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [gameState.curMove, gameState.gameStarted, gameState.gameOver])

  return intervalRef
} 