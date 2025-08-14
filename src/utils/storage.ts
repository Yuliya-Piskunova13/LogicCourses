import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleStorageError } from './errorHandler';

export const storage = {
  async save<T>(key: string, value: T): Promise<void> {
    try {
      if (value === null || value === undefined) {
        await AsyncStorage.removeItem(key);
      } else {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      const errorMessage = handleStorageError(error);
      console.error(`Error saving ${key}:`, errorMessage);
      throw new Error(errorMessage);
    }
  },

  async load<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (!value) return null;

      try {
        return JSON.parse(value);
      } catch {
        return value as T;
      }
    } catch (error) {
      const errorMessage = handleStorageError(error);
      console.error(`Error loading ${key}:`, errorMessage);
      return null;
    }
  },

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      const errorMessage = handleStorageError(error);
      console.error(`Error removing ${key}:`, errorMessage);
      throw new Error(errorMessage);
    }
  },
};
