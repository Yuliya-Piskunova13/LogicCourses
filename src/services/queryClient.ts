import { QueryClient } from '@tanstack/react-query';
import { QUERY_CONFIG, calculateRetryDelay } from '../constants/queryClient';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CONFIG.STALE_TIME,
      gcTime: QUERY_CONFIG.GC_TIME,
      retry: QUERY_CONFIG.RETRY_ATTEMPTS,
      retryDelay: calculateRetryDelay,
    },
  },
});
