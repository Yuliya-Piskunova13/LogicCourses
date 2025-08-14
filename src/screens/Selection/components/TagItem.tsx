import React from 'react';
import { TouchableOpacity } from 'react-native';
import Text from '../../../components/Text';
import { styles } from '../styles';

type TagItemProps = {
  tag: string;
  isSelected: boolean;
  onPress: (tag: string) => void;
};

const TagItem = ({ tag, isSelected, onPress }: TagItemProps) => (
  <TouchableOpacity
    style={[styles.tagItem, isSelected && styles.selectedTagItem]}
    onPress={() => onPress(tag)}
    activeOpacity={0.7}
  >
    <Text
      weight="extraBold"
      size="header"
      style={[styles.tagText, isSelected && styles.selectedTagText]}
    >
      {tag}
    </Text>
  </TouchableOpacity>
);

export default TagItem;
