import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const dimensions = {
  screen: {
    width,
    height,
  },
  card: {
    width: width * 0.4,
    height: height * 0.6,
    spacing: 20,
  },
  tag: {
    width: width * 0.5,
  },
} as const;
