import { useQuery } from '@tanstack/react-query';
import { getAllBusinesses } from '../services/authApi';

export function useBusinesses({ subCatId, isPopular, isRecent, enabled = true }) {
  const shouldFetch =
    enabled &&
    (subCatId != null ||
      isPopular === true ||
      isPopular === 1 ||
      isRecent === true ||
      isRecent === 1);

  return useQuery({
    queryKey: ['businesses', subCatId, isPopular, isRecent],
    queryFn: async () => {
      console.log("subcatId", subCatId);
      console.log("isPopluar", isPopular, isRecent);
      const res = await getAllBusinesses({
        subCatId,
        is_popular: isPopular ? 1 : undefined,
        is_recent: isRecent ? 1 : undefined,
      });
      if (!res.success) throw new Error(res.message || 'Failed to load businesses');
      return res.data;
    },
    enabled: shouldFetch,
    staleTime: 2 * 60 * 1000,
  });
}
