import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { dimensions } from '../../theme/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    marginBottom: 24,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  headerTitle: {
    color: colors.text.secondary,
  },
  closeButton: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 40,
  },
  closeButtonText: {
    color: colors.text.secondary,
  },
  allTopicsButton: {
    backgroundColor: colors.secondary.main,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  allTopicsText: {
    color: colors.background.secondary,
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagItem: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 3,
    borderColor: colors.border.medium,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: dimensions.tag.width,
  },
  selectedTagItem: {
    backgroundColor: colors.secondary.main,
    borderColor: colors.secondary.main,
  },
  tagText: {
    color: colors.text.secondary,
  },
  selectedTagText: {
    color: colors.background.secondary,
  },
});
