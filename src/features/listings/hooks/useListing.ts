import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import type { Listing } from '../types'
import { listings as localListings } from '../../../data/listings'

export const useListing = (id?: number | string): UseQueryResult<Listing, Error> => {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      const listing = localListings.find(l => l.id.toString() === id?.toString());
      if (!listing) throw new Error('Listing not found');
      return listing;
    },
    enabled: !!id,
  })
}
