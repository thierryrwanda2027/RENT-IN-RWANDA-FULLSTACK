import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useStore } from '../../../store/StoreContext';
import { api } from '../../../lib/api';
import { listings as localListings } from '../../../data/listings';

interface UseListingsReturn {
  listings: Listing[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isFetching: boolean;
  refetch: () => void;
}

export const useListings = (): UseListingsReturn => {
  const { dispatch } = useStore();

  const query = useQuery({
    queryKey: ['listings'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return localListings;
    },
  });

  // Sync with global store for components that still rely on it
  useEffect(() => {
    if (query.data) {
      dispatch({ type: 'SET_LISTINGS', payload: query.data });
    }
  }, [query.data, dispatch]);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: query.isLoading });
  }, [query.isLoading, dispatch]);

  return {
    listings: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
};
