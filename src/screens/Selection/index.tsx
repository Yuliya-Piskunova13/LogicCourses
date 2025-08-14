import React from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { useAppNavigation } from '../../hooks/useNavigation';
import { useCourses } from '../../features/courses/hooks/useCourses';
import { TagItem, SelectionHeader } from './components';

const SelectionScreen = () => {
  const navigation = useAppNavigation();
  const { selectTag, selectedTag, availableTags } = useCourses();

  const handleSelectTag = (tag: string) => {
    try {
      selectTag(tag);
      navigation.goBack();
    } catch (error) {
      console.error('Error saving selected tag:', error);
    }
  };

  const keyExtractor = (item: string) => item;

  return (
    <SafeAreaView style={styles.container}>
      <SelectionHeader onClose={() => navigation.goBack()} />
      <FlatList
        data={availableTags}
        renderItem={({ item }) => (
          <TagItem
            tag={item}
            isSelected={selectedTag === item}
            onPress={handleSelectTag}
          />
        )}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews
      />
    </SafeAreaView>
  );
};

export default SelectionScreen;
