export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'Произошла неизвестная ошибка';
};

export const handleStorageError = (error: unknown): string => {
  if (error instanceof Error) {
    return `Ошибка хранилища: ${error.message}`;
  }

  return 'Ошибка при работе с хранилищем';
};
