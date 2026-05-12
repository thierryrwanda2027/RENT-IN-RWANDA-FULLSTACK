import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../lib/api';
import { toast } from 'react-hot-toast';
import type { BookingFormData } from '../schemas/booking';

export interface Booking {
  id: number;
  listingId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  listing: {
    title: string;
    img: string;
  };
}

export const useCreateBooking = (): UseMutationResult<Booking, Error, BookingFormData> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: BookingFormData) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        id: Math.floor(Math.random() * 1000),
        ...data,
        listingId: Number(data.listingId),
        status: 'CONFIRMED',
        totalPrice: 450000,
        listing: {
          title: 'Selected Home',
          img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
        }
      } as Booking;
    },
    onSuccess: (_, variables) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['bookings', 'me'] });
      queryClient.invalidateQueries({ queryKey: ['listing', variables.listingId] });
      
      toast.success('Booking confirmed!');
      navigate('/bookings');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create booking');
    }
  });
};
