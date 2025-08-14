import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    color: colors.text.secondary,
    fontFamily: 'Nunito-Regular',
  },
  medium: {
    fontSize: 16,
    color: colors.text.primary,
    fontFamily: 'Nunito-Regular',
  },
  large: {
    fontSize: 18,
    color: colors.text.primary,
    fontFamily: 'Nunito-Regular',
  },
  title: {
    fontSize: 22,
    color: colors.text.primary,
    fontFamily: 'Nunito-Regular',
  },
  header: {
    fontSize: 26,
    color: colors.text.primary,
    fontFamily: 'Nunito-Regular',
  },
  regular: {
    fontFamily: 'Nunito-Regular',
  },
  bold: {
    fontFamily: 'Nunito-Bold',
  },
  extraBold: {
    fontFamily: 'Nunito-ExtraBold',
  },
});
