import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AppState, AppStateStatus } from 'react-native';
import { CoursesResponse, Course } from '../types';
import { coursesService } from '../api/coursesService';
import { handleApiError } from '../../../utils/errorHandler';
import { tagEventEmitter } from '../tagEventEmitter';
import { storage } from '../../../utils/storage';
import {
  QUERY_CONFIG,
  calculateRetryDelay,
} from '../../../constants/queryClient';
import { COURSES_QUERY_KEY, COURSES_CONSTANTS } from '../contants/courses';

const getAvailableTags = (courses: Course[]): string[] => {
  const uniqueTags = [...new Set(courses.flatMap(course => course.tags))];
  const sortedTags = [...uniqueTags].sort();
  return [COURSES_CONSTANTS.ALL_TOPICS_LABEL, ...sortedTags];
};

const filterCoursesByTag = (
  courses: Course[],
  selectedTag: string
): Course[] => {
  if (selectedTag === COURSES_CONSTANTS.ALL_TOPICS_LABEL) {
    return courses;
  }
  return courses.filter(course => course.tags.includes(selectedTag));
};

export const useCourses = () => {
  const [selectedTag, setSelectedTag] = useState<string>(
    COURSES_CONSTANTS.ALL_TOPICS_LABEL
  );
  const queryClient = useQueryClient();
  const lastLoadedTagRef = useRef<string>(COURSES_CONSTANTS.ALL_TOPICS_LABEL);

  const {
    data: courses = [],
    isLoading: loading,
    error,
  } = useQuery<CoursesResponse>({
    queryKey: COURSES_QUERY_KEY,
    queryFn: coursesService.getCourses,
    staleTime: QUERY_CONFIG.STALE_TIME,
    gcTime: QUERY_CONFIG.GC_TIME,
    retry: QUERY_CONFIG.RETRY_ATTEMPTS,
    retryDelay: calculateRetryDelay,
  });

  const loadSelectedTag = useCallback(async () => {
    try {
      const tag = await storage.load<string>(
        COURSES_CONSTANTS.SELECTED_TAG_KEY
      );
      if (tag) {
        setSelectedTag(tag);
        lastLoadedTagRef.current = tag;
      }
    } catch (err) {
      console.error('Error loading selected tag:', err);
    }
  }, []);

  const checkAppStateChanges = async () => {
    try {
      const currentTag = await storage.load<string>(
        COURSES_CONSTANTS.SELECTED_TAG_KEY
      );
      if (currentTag && currentTag !== lastLoadedTagRef.current) {
        setSelectedTag(currentTag);
        lastLoadedTagRef.current = currentTag;
      }
    } catch (err) {
      console.error('Error checking tag changes:', err);
    }
  };

  const handleAppStateChange = useCallback((nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      checkAppStateChanges();
    }
  }, []);

  const handleTagChanged = useCallback((tag: string | null) => {
    if (tag) {
      setSelectedTag(tag);
      lastLoadedTagRef.current = tag;
    }
  }, []);

  useEffect(() => {
    loadSelectedTag();

    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    tagEventEmitter.on('tagChanged', handleTagChanged);

    return () => {
      appStateSubscription?.remove();
      tagEventEmitter.off('tagChanged', handleTagChanged);
    };
  }, [loadSelectedTag, handleAppStateChange, handleTagChanged]);

  const availableTags = useMemo(() => {
    return getAvailableTags(courses);
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return filterCoursesByTag(courses, selectedTag);
  }, [courses, selectedTag]);

  const selectTag = useCallback(
    async (tag: string) => {
      const previousTag = selectedTag;

      try {
        setSelectedTag(tag);
        lastLoadedTagRef.current = tag;

        await storage.save(COURSES_CONSTANTS.SELECTED_TAG_KEY, tag);

        tagEventEmitter.emitTagChanged(tag);
      } catch (err) {
        const errorMessage = handleApiError(err);
        console.error('Error saving selected tag:', errorMessage);

        setSelectedTag(previousTag);
        lastLoadedTagRef.current = previousTag;
      }
    },
    [selectedTag]
  );

  const refetchCourses = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: COURSES_QUERY_KEY });
  }, [queryClient]);

  return {
    courses: filteredCourses,
    availableTags,
    selectedTag,
    loading,
    error: error ? handleApiError(error) : null,
    selectTag,
    refetch: refetchCourses,
    loadSelectedTag,
  };
};
