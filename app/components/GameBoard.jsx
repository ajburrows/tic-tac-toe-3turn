import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useCellState } from '../hooks/useCellState'
import { gameBoardSize } from '../utils'
import Cell from './cell'

export default function GameBoard({ p1Moves, p2Moves, winningLine, onCellPress }) {
  const { getCellValue, getCellAge } = useCellState(p1Moves, p2Moves)

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