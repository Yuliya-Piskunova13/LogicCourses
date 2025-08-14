export const QUERY_CONFIG = {
  STALE_TIME: 5 * 60 * 1000, // 5 минут
  GC_TIME: 10 * 60 * 1000, // 10 минут
  RETRY_ATTEMPTS: 3,
  BASE_RETRY_DELAY: 1000,
  MAX_RETRY_DELAY: 30000,
} as const;

export const calculateRetryDelay = (attemptIndex: number): number => {
  return Math.min(
    QUERY_CONFIG.BASE_RETRY_DELAY * 2 ** attemptIndex,
    QUERY_CONFIG.MAX_RETRY_DELAY
  );
};
