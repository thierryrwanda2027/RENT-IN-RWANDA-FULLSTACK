import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import { useStore } from '../../../store/StoreContext';
import { toast } from 'react-hot-toast';

export const useToggleSaved = (): UseMutationResult<any, Error, number, { previousSaved?: number[] }> => {
  const queryClient = useQueryClient();
  const { dispatch } = useStore();

  return useMutation({
    mutationFn: async (id: number) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id, success: true };
    },
    
    // Optimistic update
    onMutate: async (id) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['saved'] });

      // Snapshot the previous value
      const previousSaved = queryClient.getQueryData<number[]>(['saved']) || [];

      // Optimistically update the cache
      const isAlreadySaved = previousSaved.includes(id);
      const newSaved = isAlreadySaved 
        ? previousSaved.filter(x => x !== id)
        : [...previousSaved, id];
      
      queryClient.setQueryData(['saved'], newSaved);

      // Also update global store for immediate feedback in legacy components
      dispatch({ type: 'TOGGLE_FAVORITE', payload: id });

      return { previousSaved };
    },

    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (_err, id, context) => {
      if (context?.previousSaved) {
        queryClient.setQueryData(['saved'], context.previousSaved);
        // Rollback store
        dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
      }
      toast.error('Failed to update favorites');
    },

    // Always refetch after error or success to keep server state in sync
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['saved'] });
    },
  });
};
