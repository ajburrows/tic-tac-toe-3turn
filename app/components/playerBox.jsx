import { StyleSheet, Text, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

export default function PlayerBox({ curMove }){
    return(
      <View style={styles.playerBox}>
        <Text style={styles.playerText}>{curMove ? 'O' : 'X'} Plays</Text>
      </View>
    ) 
}

const styles = StyleSheet.create({
  playerBox: {
    display: 'flex',
    margin: 20
  },
  playerText: {
    fontSize: RFValue(35),
    fontWeight: 'bold',
    color: 'white',
    shadowColor: '#B26EFF', // purple glow
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
})