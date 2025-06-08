import { StyleSheet, Text, View } from 'react-native'
import { gameBoardSize } from '../utils'

export default function ScoreBoard({ p1Score, p2Score }) {
    return(
      <View style={styles.scoreBoard}>
        <View style={[styles.scoreTile, p1Score > p2Score ? styles.winningTile: styles.losingTile]}>
          <Text
            style={p1Score > p2Score
                ? styles.winningScoreText
                : styles.losingScoreText
            }
          >X: {p1Score}</Text>
        </View>
        <View style={[styles.scoreTile, p2Score > p1Score ? styles.winningTile: styles.losingTile]}>
          <Text
            style={p2Score > p1Score
                ? styles.winningScoreText
                : styles.losingScoreText
            }
          >O: {p2Score}</Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  scoreBoard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    margin: 20,
    width: gameBoardSize,
  },
  scoreTile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // The winning player gets and emphasized scoreTile. If there is a tie, neither is emphasized.
  winningTile: {
    padding: 10,
    backgroundColor: '#633A87',

    borderColor: '#4A2C63',
    borderWidth: 3,
    borderRadius: 5,

    shadowColor: '#B26EFF', // purple glow
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  losingTile: {
    padding: 10,
    backgroundColor: '#FFFFFF',

    borderColor: '#4A2C63',
    borderWidth: 3,
    borderRadius: 5,
  },
  winningScoreText: {
    fontSize: 40,
    color: '#FFFFFF',
  },
  losingScoreText: {
    fontSize: 40,
    color: '#633A87',
  },
})