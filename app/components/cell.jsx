import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { gameBoardSize } from '../utils'

export default function Cell({ value, makeMove, age }) {
    return (
        <TouchableOpacity
            style={styles.cell}
            onPress={makeMove}
        >
            <Text style={[styles.text, age && styles[age]]}>{value}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
  cell: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',
    height: gameBoardSize / 3.2,
    width: gameBoardSize / 3.2,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,

    borderRadius: 10,
  },
  text: {
    fontSize: 65,
    fontWeight: 300,
    color: '#4A2C63',
    //color: '#B0B0C0',
  },
  young: {
    opacity: 1
  },
  middle: {
    opacity: 0.66
  },
  old: {
    opacity: 0.33
  }
})