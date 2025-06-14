import { MotiView } from 'moti'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

import GameBoard from './components/GameBoard'
import GameOver from './components/gameOver'
import PlayerBox from './components/playerBox'
import ScoreBoard from './components/scoreBoard'
import { GAME_CONFIG } from './config/game'
import { useGameMoves } from './hooks/useGameMoves'
import { useGameTimer } from './hooks/useGameTimer'

export default function Index() {
  const [gameState, setGameState] = useState({
    p1Moves: [],
    p2Moves: [],
    curMove: 0,
    p1Score: 0,
    p2Score: 0,
    gameOver: false,
    winningLine: [],
    showGameOver: false,
    isRestarting: false,
    secondsLeft: GAME_CONFIG.TURN_DURATION,
    gameStarted: false
  });

  // Wait for the score animation to complete before switching to the Game Over screen
  useEffect(() => {
    if (gameState.gameOver) {
      const timeout = setTimeout(() => setGameState(prev => ({ ...prev, showGameOver: true })), 500)
      return () => clearTimeout(timeout)
    }
  }, [gameState.gameOver])

  // Pause timer when game ends
  useEffect(() => {
    // Check if the game is over
    if (!gameState.gameOver && (gameState.p1Score >= GAME_CONFIG.POINTS_TO_WIN || gameState.p2Score >= GAME_CONFIG.POINTS_TO_WIN)){
      const timeout = setTimeout(() => {
        setGameState(prev => ({ ...prev, gameOver: true }))
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [gameState.p1Score, gameState.p2Score, gameState.gameOver])

  // Alternate between players on every turn
  const changePlayer = () => {
    setGameState(prev => ({ ...prev, curMove: (prev.curMove + 1) % 2 }))
    if (!gameState.gameStarted) setGameState(prev => ({ ...prev, gameStarted: true }))
  }

  // Start the timer and handle moves
  const intervalRef = useGameTimer(gameState, setGameState, changePlayer)
  const { makeMove } = useGameMoves(gameState, setGameState, changePlayer, intervalRef)

  function getCellValue(index) {
    if (gameState.p1Moves.includes(index)) return 'X'
    if (gameState.p2Moves.includes(index)) return '0'
    return ''
  }

  function getCellAge(index) {
    if (gameState.p1Moves[0] === index || gameState.p2Moves[0] === index) return 'old'
    if (gameState.p1Moves[1] === index || gameState.p2Moves[1] === index) return 'middle'
    if (gameState.p1Moves[2] === index || gameState.p2Moves[2] === index) return 'young'

    return ''
  }

  function restartGame(){
    setGameState(prev => ({
      ...prev,
      isRestarting: true
    }))

    // Wait for scoring animation to complete before restarting the game
    setTimeout(() => {
      setGameState({
        p1Moves: [],
        p2Moves: [],
        curMove: 0,
        p1Score: 0,
        p2Score: 0,
        gameOver: false,
        winningLine: [],
        showGameOver: false,
        isRestarting: false,
        secondsLeft: GAME_CONFIG.TURN_DURATION,
        gameStarted: false
      })
    }, 500)
  }

  return (
    <SafeAreaView style={styles.container}>
      <MotiView
        from={{ opacity: 1}}
        animate={{ opacity: gameState.gameOver ? 0 : 1 }}
        transition={{ duration: 500}}
      >
          {!gameState.showGameOver && (
            <SafeAreaView style={styles.container}>
                {/* Display whose turn it is */}
                <PlayerBox curMove={gameState.curMove} />
                
                {/* Display turn timer */}
                <Text style={styles.timerText}>{gameState.secondsLeft.toFixed(1)}s</Text>

                {/* Hold the tiles to make and display moves */}
                <GameBoard 
                  p1Moves={gameState.p1Moves}
                  p2Moves={gameState.p2Moves}
                  winningLine={gameState.winningLine}
                  onCellPress={makeMove}
                />

                {/* Show the current scores for each player */}
                <ScoreBoard p1Score={gameState.p1Score} p2Score={gameState.p2Score} />
            </SafeAreaView>
          )}
      </MotiView>
      
      {gameState.showGameOver && (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: gameState.isRestarting ? 0 : 1 }}
          transition={{ duration: 500 }}
        >
          <SafeAreaView style={styles.container}>
            <GameOver 
              winner={gameState.p1Score >= GAME_CONFIG.POINTS_TO_WIN ? 'X' : 'O'} 
              onPress={restartGame}
            />
          </SafeAreaView>
        </MotiView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5E6E8'
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4A2C63'
  }
})
