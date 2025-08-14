import { useMemo, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CoursesResponse } from '../types';
import { coursesService } from '../api/coursesService';
import { handleApiError } from '../../../utils/errorHandler';
import {
  QUERY_CONFIG,
  calculateRetryDelay,
} from '../../../constants/queryClient';
import { COURSES_QUERY_KEY } from '../contants/courses';
import { getAvailableTags, filterCoursesByTag } from '../utils/courseFilters';
import { useTagManagement } from './useTagManagement';

export const useCourses = () => {
  const { selectedTag, saveSelectedTag } = useTagManagement();
  const queryClient = useQueryClient();

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

  const availableTags = useMemo(() => {
    return getAvailableTags(courses);
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return filterCoursesByTag(courses, selectedTag);
  }, [courses, selectedTag]);

  const selectTag = useCallback(
    async (tag: string) => {
      await saveSelectedTag(tag);
    },
    [saveSelectedTag]
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
  };
};
