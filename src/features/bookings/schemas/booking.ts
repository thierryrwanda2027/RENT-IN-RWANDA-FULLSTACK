import { z } from 'zod';

export const bookingStep1Schema = z.object({
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  guests: z.number().min(1, 'At least 1 guest is required').max(16, 'Maximum 16 guests allowed'),
}).refine((data) => {
  const checkIn = new Date(data.checkIn);
  const checkOut = new Date(data.checkOut);
  return checkOut > checkIn;
}, {
  message: "Check-out must be after check-in",
  path: ["checkOut"],
});

export const personalSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Phone number must be at least 7 characters'),
});

export type PersonalData = z.infer<typeof personalSchema>;
export const bookingStep2Schema = personalSchema;

export const bookingStep3Schema = z.object({
  card: z.string().regex(/^\d{16}$/, 'Card must be exactly 16 digits'),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry must be in MM/YY format'),
  cvv: z.string().regex(/^\d{3}$/, 'CVV must be exactly 3 digits'),
});

export const fullBookingSchema = bookingStep1Schema
  .and(personalSchema)
  .and(bookingStep3Schema)
  .and(z.object({ listingId: z.number() }));

export type BookingFormData = z.infer<typeof fullBookingSchema>;
export type BookingData = BookingFormData;
