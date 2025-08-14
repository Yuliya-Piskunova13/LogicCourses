export type Course = {
  id: string;
  name: string;
  image: string;
  bgColor: string;
  tags: string[];
};

export type CoursesResponse = Course[];
