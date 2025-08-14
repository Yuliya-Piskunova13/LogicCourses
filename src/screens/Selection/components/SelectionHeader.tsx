import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import Text from '../../../components/Text';
import Close from '../../../assets/icons/close.svg';
import { styles } from '../styles';

type SelectionHeaderProps = {
  onClose: () => void;
};

const SelectionHeader = ({ onClose }: SelectionHeaderProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text size="header" weight="extraBold" style={styles.headerTitle}>
          {t('tagSelector.title')}
        </Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          activeOpacity={0.7}
        >
          <Close height="32" width="32" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectionHeader;
