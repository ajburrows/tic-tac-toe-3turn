import { MotiView } from 'moti'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

import Cell from './components/cell'
import GameOver from './components/gameOver'
import PlayerBox from './components/playerBox'
import ScoreBoard from './components/scoreBoard'

import { gameBoardSize } from './utils'

const POINTS_TO_WIN = 3
const TURN_DURATION = 5 // each players has this many seconds to make their move


export default function Index() {
  const [p1Moves, setP1Moves] = useState([]) // index 0 is the oldest move and index 2 is the youngest
  const [p2Moves, setP2Moves] = useState([])
  const [curMove, setCurMove] = useState(0) // 0 is P1's move and 1 is P2's move
  const [p1Score, setP1Score] = useState(0)
  const [p2Score, setP2Score] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [winningLine, setWinningLine] = useState([])
  const [showGameOver, setShowGameOver] = useState(false)
  const [isRestarting, setIsRestarting] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(TURN_DURATION)
  const [gameStarted, setGameStarted] = useState(false)
  const intervalRef = useRef(null)

  // Wait for the score animation to complete before switching to the Game Over screen
  useEffect(() => {
    if (gameOver) {
      const timeout = setTimeout(() => setShowGameOver(true), 500)
      return () => clearTimeout(timeout)
    }
  }, [gameOver])

  // Stop the timer when the game ends
  useEffect(() => {
    if (gameOver && intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [gameOver, intervalRef.current])

  // Reset timer when a move is made
  useEffect(() => {
    if (!gameStarted || gameOver) return

    setSecondsLeft(TURN_DURATION)

    if (intervalRef.current) clearInterval(intervalRef.current)

    // Start timer's countdown interval
    const id = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 0.1) {
          clearInterval(id)
          changePlayer()
          return TURN_DURATION
        }
        return +(prev - 0.1).toFixed(1)
      })
    }, 100)

    intervalRef.current = id

    return () => clearInterval(id)
  }, [curMove])

  useEffect(() => {
    // Check if the game is over
    if (!gameOver && (p1Score >= POINTS_TO_WIN || p2Score >= POINTS_TO_WIN)){
      const timeout = setTimeout(() => {
        setGameOver(true)
        console.log(`clearing intervalRef.current: ${intervalRef.current}`)
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [p1Score, p2Score, gameOver])

  // Alternate between players on every turn
  const changePlayer = () => {
    setCurMove((curMove+1) % 2)
    if (!gameStarted) setGameStarted(true)
  }

  const makeMove = (index) => {
    // mark a tile with X or O and check if a point was scored
    // remove the oldest tile and add the selected tile to the player's moves
    if (p1Moves.includes(index) || p2Moves.includes(index)){
      console.log(`Tile ${index} is taken`)
      return
    } 

    if (intervalRef.current) clearInterval(intervalRef.current)
    
    if (curMove == 0){
      const updatedMoves = [p1Moves[1], p1Moves[2], index]
      setP1Moves(updatedMoves)
      const winCombo = checkWin(updatedMoves)
      if (winCombo){
        console.log('P1 scored')
        setP1Score(p1Score + 1)
        setWinningLine(winCombo)

        if (intervalRef.current && gameOver){
          console.log('clearing interval')
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }

        setTimeout(() => {
          setWinningLine([])
        }, 600)

        if (p1Score >= POINTS_TO_WIN - 1) return
      }
    } else {
      const updatedMoves = [p2Moves[1], p2Moves[2], index]
      setP2Moves(updatedMoves)
      const winCombo = checkWin(updatedMoves)
      if (winCombo){
        setP2Score(p2Score + 1)
        setWinningLine(winCombo)

        if (intervalRef.current && gameOver){
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }

        setTimeout(() => {
          setWinningLine([])
        }, 600)

        if (p2Score >= POINTS_TO_WIN - 1) return
      }
    }
    console.log("changing player")
    changePlayer()
  }

  function getCellValue(index) {
    if (p1Moves.includes(index)) return 'X'
    if (p2Moves.includes(index)) return '0'
    return ''
  }

  function getCellAge(index) {
    if (p1Moves[0] === index) return 'old'
    if (p1Moves[1] === index) return 'middle'
    if (p1Moves[2] === index) return 'young'

    if (p2Moves[0] === index) return 'old'
    if (p2Moves[1] === index) return 'middle'
    if (p2Moves[2] === index) return 'young'

    return ''
  }

  const winningCombos = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal
    [2, 4, 6], // diagonal
  ]

  function checkWin(playerMoves) {
    for (const combo of winningCombos) {
      if (combo.every(index => playerMoves.includes(index))) {
        return combo;
      }
    }

    return null
  }

  function restartGame(){
    console.log('restarting game')

    setIsRestarting(true);

    setTimeout(() => {
      setP1Moves([])
      setP2Moves([])
      setCurMove(0)
      setP1Score(0)
      setP2Score(0)
      setGameOver(false)
      setShowGameOver(false)
      setIsRestarting(false)
      setSecondsLeft(TURN_DURATION)
      setGameStarted(false)
      intervalRef.current = null
    }, 500)
  }

  return (
    <SafeAreaView style={styles.container}>
      <MotiView
        from={{ opacity: 1}}
        animate={{ opacity: gameOver ? 0 : 1 }}
        transition={{ duration: 500}}
      >
          {!showGameOver && (
            <SafeAreaView style={styles.container}>
                {/* Display whose turn it is */}
                <PlayerBox curMove={curMove} />
                
                {/* Display turn timer */}
                <Text style={styles.timerText}>{secondsLeft.toFixed(1)}s</Text>

                {/* Hold the tiles to make and display moves */}
                <View style={styles.gameBoard}>
                  {Array.from({ length: 9 }).map((_, index) => (
                    <Cell
                      key={index} 
                      id={index} 
                      value={getCellValue(index)} 
                      makeMove={() => makeMove(index)}
                      age={getCellAge(index)}
                      highlighted={winningLine.includes(index)}
                    >
                    </Cell>
                  ))}
                </View>

                {/* Show the current scores for each player */}
                <ScoreBoard p1Score={p1Score} p2Score={p2Score} />
            </SafeAreaView>
            )}
      </MotiView>
      
      {showGameOver && (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: isRestarting ? 0 : 1 }}
          transition={{ duration: 500 }}
        >
          <SafeAreaView style={styles.container}>
            <GameOver winner={p1Score >= POINTS_TO_WIN ? 'X' : 'O'} onPress={restartGame}/>
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
  gameBoard: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'space-around',
    height: gameBoardSize,
    width: gameBoardSize,
    backgroundColor: '#9368B7',
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#9368B7',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4A2C63'
  }
})
