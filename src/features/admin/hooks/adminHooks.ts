import { useQuery, useMutation, useQueryClient, type UseQueryResult, type UseMutationResult } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import { toast } from 'react-hot-toast';
import type { Listing } from '../../listings/types';
import type { Booking } from '../../bookings/hooks/useCreateBooking';

export interface AdminStats {
  totalUsers: number;
  totalListings: number;
  totalRevenue: number;
  activeBookings: number;
}

export const useAdminStats = (): UseQueryResult<AdminStats, Error> => {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      return {
        totalUsers: 1250,
        totalListings: 50,
        totalRevenue: 45800000,
        activeBookings: 85,
      };
    },
  });
};

export const usePendingListings = (): UseQueryResult<Listing[], Error> => {
  return useQuery({
    queryKey: ['listings', 'pending'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return []; // No pending listings in demo
    },
  });
};

export const useApproveListing = (): UseMutationResult<any, Error, number> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return { id, success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings', 'pending'] });
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      toast.success('Listing approved');
    }
  });
};

export const useRejectListing = (): UseMutationResult<any, Error, number> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return { id, success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings', 'pending'] });
      toast.success('Listing rejected');
    }
  });
};

export const useAllBookings = (status?: string): UseQueryResult<Booking[], Error> => {
  return useQuery({
    queryKey: ['bookings', 'all', status],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 700));
      return []; // Return empty list for demo
    },
  });
};
