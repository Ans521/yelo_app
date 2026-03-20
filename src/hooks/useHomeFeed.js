import { useQuery } from '@tanstack/react-query';
import { getHomeFeed } from '../services/authApi';

export const HOME_FEED_QUERY_KEY = ['homeFeed'];

export function useHomeFeed() {
  return useQuery({
    queryKey: HOME_FEED_QUERY_KEY,
    queryFn: async () => {
      const res = await getHomeFeed();
      if (!res.success) throw new Error(res.message || 'Failed to load home feed');
      return res.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes (formerly cacheTime)
    refetchOnMount: 'always',  // always call API when HomeScreen mounts (e.g. after "Explore as guest")
  });
}
