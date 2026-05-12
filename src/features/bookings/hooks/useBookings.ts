import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { api } from '../../../lib/api'
import type { BookingData } from '../schemas/booking'

export interface Booking extends BookingData {
  id: number;
  createdAt: string;
}

export function useBookings(): UseQueryResult<Booking[], Error> {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: () => api.get<Booking[]>('/bookings'),
  })
}
