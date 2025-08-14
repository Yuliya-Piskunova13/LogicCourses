import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { styles } from './styles';

type TextSize = 'small' | 'medium' | 'large' | 'title' | 'header';

type TextProps = RNTextProps & {
  size?: TextSize;
  weight?: 'regular' | 'bold' | 'extraBold';
};

const Text = ({
  size = 'medium',
  weight = 'regular',
  style,
  ...props
}: TextProps) => (
  <RNText style={[styles[size], styles[weight], style]} {...props} />
);

export default Text;
