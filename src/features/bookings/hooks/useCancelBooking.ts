import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import { toast } from 'react-hot-toast';
import type { Booking } from './useCreateBooking';

export const useCancelBooking = (): UseMutationResult<{ message: string }, Error, number, { previousBookings?: Booking[] }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return { message: 'Booking cancelled successfully' };
    },
    
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['bookings', 'me'] });
      const previousBookings = queryClient.getQueryData<Booking[]>(['bookings', 'me']);

      // Optimistically remove the booking or update its status
      queryClient.setQueryData(['bookings', 'me'], (old: Booking[] | undefined) => {
        return old?.filter(b => b.id !== id);
      });

      return { previousBookings };
    },

    onError: (_err, _id, context) => {
      if (context?.previousBookings) {
        queryClient.setQueryData(['bookings', 'me'], context.previousBookings);
      }
      toast.error('Failed to cancel booking');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', 'me'] });
    },
  });
};
