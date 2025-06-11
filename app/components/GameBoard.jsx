import React from 'react'
import { StyleSheet, View } from 'react-native'
import { gameBoardSize } from '../utils'
import Cell from './cell'

export default function GameBoard({ p1Moves, p2Moves, winningLine, onCellPress }) {
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

  return (
    <View style={styles.gameBoard}>
      {Array.from({ length: 9 }).map((_, index) => (
        <Cell
          key={index}
          id={index}
          value={getCellValue(index)}
          makeMove={() => onCellPress(index)}
          age={getCellAge(index)}
          highlighted={winningLine.includes(index)}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
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
  }
}) 