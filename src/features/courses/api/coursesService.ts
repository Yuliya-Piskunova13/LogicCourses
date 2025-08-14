import { api } from '../../../api/client';
import { ENDPOINTS } from '../../../api/endpoints';
import { CoursesResponse } from '../types';

export const coursesService = {
  getCourses: async (): Promise<CoursesResponse> => {
    const response = await api.get<CoursesResponse>(ENDPOINTS.COURSES);
    return response.data;
  },
};
