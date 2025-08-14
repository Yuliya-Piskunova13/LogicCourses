export const ENDPOINTS = {
  COURSES: '/docs/courses.json',
} as const;

export type Endpoint = (typeof ENDPOINTS)[keyof typeof ENDPOINTS];
