import {Dimensions} from 'react-native';

export const {width: screenWidth} = Dimensions.get('window');

export function scaledSize(size: number, baseScreenWidth = 375) {
  const pixelRatio = screenWidth / baseScreenWidth;
  return pixelRatio * size;
}
