import { useState, useEffect, useCallback, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { tagEventEmitter } from '../tagEventEmitter';
import { storage } from '../../../utils/storage';
import { handleApiError } from '../../../utils/errorHandler';
import { COURSES_CONSTANTS } from '../contants/courses';

export const useTagManagement = () => {
  const [selectedTag, setSelectedTag] = useState<string>(
    COURSES_CONSTANTS.ALL_TOPICS_LABEL
  );
  const lastLoadedTagRef = useRef<string>(COURSES_CONSTANTS.ALL_TOPICS_LABEL);

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

  const checkAppStateChanges = useCallback(async () => {
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
  }, []);

  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        checkAppStateChanges();
      }
    },
    [checkAppStateChanges]
  );

  const handleTagChanged = useCallback((tag: string | null) => {
    if (tag) {
      setSelectedTag(tag);
      lastLoadedTagRef.current = tag;
    }
  }, []);

  const saveSelectedTag = useCallback(
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
        throw new Error(errorMessage);
      }
    },
    [selectedTag]
  );

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

  return {
    selectedTag,
    saveSelectedTag,
    loadSelectedTag,
  };
};
