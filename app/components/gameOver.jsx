import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function GameOver({ winner }){
    return (
        <View style={styles.container}>
            <Text style={styles.gameOverText}>{winner} WINS</Text>
            <TouchableOpacity style={styles.restartBtn}>
                <Text style={styles.restartText}>Restart Game</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5E6E8',
        width: '100%',

    },
    gameOverText: {
        fontSize: 65,
        color: '#4A2C63',
        marginBottom: 10,
    },
    restartBtn: {
        borderWidth: 2,
        borderColor: '#4A2C63',
        backgroundColor: '#633A87',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    restartText: {
        fontSize: 25,
        color: '#FFFFF0',

    }
})