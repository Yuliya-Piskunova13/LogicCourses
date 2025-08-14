import { Course } from '../types';
import { COURSES_CONSTANTS } from '../contants/courses';

export const getAvailableTags = (courses: Course[]): string[] => {
  const uniqueTags = [...new Set(courses.flatMap(course => course.tags))];
  const sortedTags = [...uniqueTags].sort();
  return [COURSES_CONSTANTS.ALL_TOPICS_LABEL, ...sortedTags];
};

export const filterCoursesByTag = (
  courses: Course[],
  selectedTag: string
): Course[] => {
  if (selectedTag === COURSES_CONSTANTS.ALL_TOPICS_LABEL) {
    return courses;
  }
  return courses.filter(course => course.tags.includes(selectedTag));
};
