import {Extrapolation, interpolate} from 'react-native-reanimated';

export const parallaxLayout = (
  baseConfig: {
    size: number;
  },
  modeConfig: {
    parallaxScrollingOffset: number;
    parallaxMainOffset: number;
    parallaxScrollingScale: number;
    parallaxAdjacentItemScale: number;
  },
) => {
  const {size} = baseConfig;
  const {
    parallaxScrollingOffset,
    parallaxMainOffset,
    parallaxScrollingScale,
    parallaxAdjacentItemScale,
  } = modeConfig;

  return (value: number) => {
    'worklet';
    const translate = interpolate(
      value,
      [-1, 0, 1],
      [
        -size + parallaxScrollingOffset,
        parallaxMainOffset,
        size + parallaxScrollingOffset,
      ],
    );

    const scale = interpolate(
      value,
      [-1, 0, 1],
      [
        parallaxAdjacentItemScale,
        parallaxScrollingScale,
        parallaxAdjacentItemScale,
      ],
      Extrapolation.CLAMP,
    );

    return {
      transform: [
        {
          translateX: translate,
        },
        {
          scale,
        },
      ],
    };
  };
};
