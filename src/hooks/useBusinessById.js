import { useQuery } from '@tanstack/react-query';
import { getBusinessById } from '../services/authApi';

export function useBusinessById(businessId) {
  return useQuery({
    queryKey: ['business', businessId],
    queryFn: async () => {
      const res = await getBusinessById(businessId);
      if (!res.success) throw new Error(res.message || 'Failed to load business');
      console.log("res india", res)
      return res.data;
    },
    enabled: !!businessId,
    // staleTime: 2 * 60 * 1000,
  });
}
