import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { dimensions } from '../../theme/dimensions';

export const styles = StyleSheet.create({
  container: {
    width: dimensions.card.width,
  },
  card: {
    backgroundColor: colors.background.secondary,
    borderRadius: 24,
    height: dimensions.card.height,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '80%',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  wrapper: {
    backgroundColor: 'rgba(229, 232, 254, 1)',
    borderRadius: 24,
    paddingBottom: 12,
    marginRight: 20,
  },
});
