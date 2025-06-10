import { MotiView, useAnimationState } from 'moti';
import { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { cellSize, gameBoardSize } from '../utils';

export default function Cell({ value, makeMove, age, highlighted }) {
  const animationState = useAnimationState({
    idle: { scale: 1,
            opacity: 1,
            shadowOpacity: 0,
            shadowColor: 'pink',
            shadowRadius: 25,
            borderColor: 'red',
            borderWidth: 0
          },
    grow: { scale: 1.15,
            opacity: 1,
            shadowOpacity: 1,
            borderColor: 'pink',
            borderWidth: 2,
          },
  });

  useEffect(() => {
    if (highlighted) {
      animationState.transitionTo('idle');
      setTimeout(() => animationState.transitionTo('grow'), 100)
      setTimeout(() => animationState.transitionTo('idle'), 600);
    }
  }, [highlighted]);

  return (
    <MotiView
      state={animationState}
      style={styles.cell}
      transition={{type: 'timing', duration: 300}}
      onTouchEnd={makeMove}
    >
      <MotiView style={[styles.text, age && styles[age]]}>
        <Text style={styles.text}>{value}</Text>
      </MotiView>
    </MotiView>
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
    fontSize: cellSize * 0.75,
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
  },
})

/*
  highlight: {
    shadowColor: 'gold',
    shadowOpacity: 0.9,
    shadowRadius: 10,
  }

  const animationState = useAnimationState({
    idle: { scale: 1, opacity: 1 },
    grow: { scale: 1.1, opacity: 1 },
    shrink: { scale: 0, opacity: 0.3 },
    reset: { scale: 1, opacity: 1 },
  });

  useEffect(() => {
    if (highlighted) {
      animationState.transitionTo('grow');
      setTimeout(() => animationState.transitionTo('shrink'), 300);
      setTimeout(() => animationState.transitionTo('reset'), 800);
    }
  }, [highlighted]);

*/