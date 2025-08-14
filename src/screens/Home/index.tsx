import React from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import Card from '../../components/Card';
import ArrowIcon from '../../assets/icons/arrow.svg';
import { useCourses } from '../../features/courses/hooks/useCourses';
import { styles } from './styles';
import { useAppNavigation } from '../../hooks/useNavigation';
import { Course } from '../../features/courses/types';
import { ROUTES } from '../../constants/navigation';
import { colors } from '../../theme/colors';
import Text from '../../components/Text';
import { COURSES_CONSTANTS } from '../../features/courses/contants/courses';

const HomeScreen = () => {
  const navigation = useAppNavigation();
  const { t } = useTranslation();
  const { courses, selectedTag, loading, error, refetch } = useCourses();

  const handleOpenTagSelector = () => {
    navigation.navigate(ROUTES.SELECTION);
  };

  const renderCourse = ({ item }: { item: Course }) => (
    <Card title={item.name} imageUri={item.image} bgColor={item.bgColor} />
  );

  const keyExtractor = (item: Course) => item.id;

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.loading.indicator} />
        <Text size="large" weight="bold" style={styles.loadingText}>
          {t('courses.loading')}
        </Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text weight="bold" size="header" style={styles.errorText}>
          {t('courses.error', { error })}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={refetch}>
          <Text weight="bold" style={styles.retryButtonText}>
            {t('courses.retry')}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.tagSelector}
          onPress={handleOpenTagSelector}
          activeOpacity={0.7}
        >
          <Text weight="bold" style={styles.currentTagText}>
            {selectedTag || COURSES_CONSTANTS.ALL_TOPICS_LABEL}
          </Text>
          <View style={styles.arrowContainer}>
            <ArrowIcon />
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={courses}
        renderItem={renderCourse}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.coursesList}
        initialNumToRender={2}
        maxToRenderPerBatch={3}
        windowSize={3}
        removeClippedSubviews
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
