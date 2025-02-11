import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export function scaledSize(size: number, baseScreenWidth = 375) {
  const pixelRatio = width / baseScreenWidth;
  return pixelRatio * size;
}
