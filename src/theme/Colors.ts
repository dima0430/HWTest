import _ from 'lodash';

export type IColors = keyof typeof Colors;
export type IColorsValue = (typeof ColorsValues)[number];
type IHexOpacities = keyof typeof HexOpacities;

export const Colors = {
  pink: '#DD48A1',
  white: '#FFFFFF',
  darkGrey: '#101010',
  brightPink: '#D0006E',
  darkPurple: '#0B080F',
  gray: '#C4C4C4',
  whiteGray: '#D9D5D6',
} as const;

const ColorsValues = Object.values(Colors);

export const HexOpacities = {
  100: 'FF',
  90: 'E6',
  80: 'CC',
  70: 'B3',
  60: '99',
  50: '80',
  40: '66',
  30: '4D',
  20: '33',
  10: '1A',
  0: '00',
};

export const withHexOpacity = (
  color: IColors | IColorsValue,
  hexOpacity: IHexOpacities,
) =>
  `${_.includes(ColorsValues, color) ? color : Colors[color as IColors]}${
    HexOpacities[hexOpacity]
  }`;
