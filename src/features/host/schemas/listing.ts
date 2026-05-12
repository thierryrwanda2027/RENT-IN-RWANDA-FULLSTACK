import { z } from 'zod';

export const listingSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  location: z.string().min(1, 'Location is required'),
  price: z.number().min(10000, 'Price must be at least 10,000 RWF'),
  category: z.enum(['city', 'beach', 'mountain', 'countryside']),
  superhost: z.boolean(),
  available: z.boolean(),
  availableFrom: z.string().min(1, 'Availability date is required'),
  img: z.string().url('Invalid image URL').min(1, 'Image is required'),
});

export type ListingFormData = z.infer<typeof listingSchema>;
