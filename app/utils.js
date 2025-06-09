import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const gameBoardSize = Math.min(windowWidth, windowHeight) * 0.8;

export const cellSize = gameBoardSize / 3.2;
