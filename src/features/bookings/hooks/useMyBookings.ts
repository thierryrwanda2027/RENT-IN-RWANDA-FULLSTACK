import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import type { Booking } from './useCreateBooking';

export const useMyBookings = (): UseQueryResult<Booking[], Error> => {
  return useQuery({
    queryKey: ['bookings', 'me'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return [
        {
          id: 101,
          listingId: 1,
          checkIn: '2025-06-10',
          checkOut: '2025-06-15',
          guests: 2,
          totalPrice: 1250000,
          status: 'CONFIRMED',
          listing: {
            title: 'Luxury Villa with Balcony',
            img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
          }
        }
      ] as Booking[];
    },
  });
};
