import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.thirdly,
    paddingTop: 12,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowContainer: {
    backgroundColor: colors.transparent.primary,
    height: 18,
    width: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginLeft: 8,
    padding: 8,
  },
  tagSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.transparent.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  currentTagText: {
    color: colors.text.white,
  },
  coursesList: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
  loadingText: {
    marginTop: 16,
    color: colors.text.secondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    paddingHorizontal: 20,
  },
  errorText: {
    color: colors.error.main,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.background.secondary,
  },
});
