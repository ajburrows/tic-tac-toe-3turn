import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'

import Cell from './components/cell'
import GameOver from './components/gameOver'
import PlayerBox from './components/playerBox'
import ScoreBoard from './components/scoreBoard'

import { gameBoardSize } from './utils'


export default function Index() {
  const [p1Moves, setP1Moves] = useState([]) // index 0 is the oldest move and index 2 is the youngest
  const [p2Moves, setP2Moves] = useState([])
  const [curMove, setCurMove] = useState(0) // 0 is P1's move and 1 is P2's move
  const [p1Score, setP1Score] = useState(0)
  const [p2Score, setP2Score] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [winningLine, setWinningLine] = useState([])



  useEffect(() => {
    // Check if the game is over
    if (!gameOver && (p1Score >= 3 || p2Score >= 3)){
      setGameOver(true)
      console.log('GAME OVER')
    }
  }, [p1Score, p2Score, gameOver])

  // Alternate between players on every turn
  const changePlayer = () => {setCurMove((curMove+1) % 2)}

  const makeMove = (index) => {
    // mark a tile with X or O and check if a point was scored
    // remove the oldest tile and add the selected tile to the player's moves
    if (p1Moves.includes(index) || p2Moves.includes(index)){
      console.log(`Tile ${index} is taken`)
      return
    } 
    
    if (curMove == 0){
      const updatedMoves = [p1Moves[1], p1Moves[2], index]
      setP1Moves(updatedMoves)
      const winCombo = checkWin(updatedMoves)
      if (winCombo){
        setP1Score(p1Score + 1)
        setWinningLine(winCombo)
      }
    } else {
      const updatedMoves = [p2Moves[1], p2Moves[2], index]
      setP2Moves(updatedMoves)
      const winCombo = checkWin(updatedMoves)
      if (winCombo){
        setP2Score(p2Score + 1)
        setWinningLine(winCombo)
      }
    }
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
    setP1Moves([])
    setP2Moves([])
    setCurMove(0)
    setP1Score(0)
    setP2Score(0)
    setGameOver(false)
  }

  return (
    <SafeAreaView 
      style={styles.container}>
      {gameOver && (
        <GameOver winner={p1Score >= 3 ? 'X' : 'O'} onPress={restartGame}/>
      )}
      {!gameOver && (
        <>
          {/* Display whose turn it is*/}
          <PlayerBox curMove={curMove} />

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

        </>
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
})
