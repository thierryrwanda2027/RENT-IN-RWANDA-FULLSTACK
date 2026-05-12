import { useQuery, useMutation, useQueryClient, type UseQueryResult, type UseMutationResult } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import { toast } from 'react-hot-toast';
import type { Listing } from '../../listings/types';
import type { ListingFormData } from '../schemas/listing';

export const useMyListings = (): UseQueryResult<Listing[], Error> => {
  return useQuery({
    queryKey: ['listings', 'mine'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return []; // Return empty list for demo
    },
  });
};

export const useCreateListing = (): UseMutationResult<Listing, Error, ListingFormData> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ListingFormData) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return { ...data, id: Date.now() } as unknown as Listing;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings', 'mine'] });
      toast.success('Listing created successfully');
    }
  });
};

export const useUpdateListing = (id: string | undefined): UseMutationResult<Listing, Error, ListingFormData, { previous?: Listing }> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ListingFormData) => {
      await new Promise(resolve => setTimeout(resolve, 600));
      return { ...data, id: Number(id) } as unknown as Listing;
    },
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['listing', id] });
      const previous = queryClient.getQueryData<Listing>(['listing', id]);
      queryClient.setQueryData(['listing', id], (old: Listing | undefined) => (old ? { ...old, ...newData } : undefined));
      return { previous };
    },
    onError: (_err, _, context) => {
      if (context?.previous) queryClient.setQueryData(['listing', id], context.previous);
      toast.error('Update failed');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['listings', 'mine'] });
    }
  });
};

export const useDeleteListing = (): UseMutationResult<{ message: string }, Error, number, { previous?: Listing[] }> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { message: 'Listing deleted successfully' };
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['listings', 'mine'] });
      const previous = queryClient.getQueryData<Listing[]>(['listings', 'mine']);
      queryClient.setQueryData(['listings', 'mine'], (old: Listing[] | undefined) => {
        return old?.filter(l => l.id !== id);
      });
      return { previous };
    },
    onError: (_err, _, context) => {
      if (context?.previous) queryClient.setQueryData(['listings', 'mine'], context.previous);
      toast.error('Delete failed');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['listings', 'mine'] });
    }
  });
};
