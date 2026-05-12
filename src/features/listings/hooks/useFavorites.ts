import { useStore } from '../../../store/StoreContext';
import { useToggleSaved } from './useToggleSaved';
import { toast } from 'react-hot-toast';

interface UseFavoritesReturn {
  saved: number[];
  count: number;
  isSaved: (id: number) => boolean;
  toggle: (id: number, title: string) => Promise<void>;
  isLoading: boolean;
}

export const useFavorites = (): UseFavoritesReturn => {
  const { state } = useStore();
  const toggleMutation = useToggleSaved();

  const toggle = async (id: number, title: string) => {
    const isSaved = state.saved.includes(id);
    
    // Trigger mutation
    toggleMutation.mutate(id);
    
    if (isSaved) {
      toast.error(`Removed: ${title}`, {
        icon: '🗑️',
        style: { borderRadius: '10px', background: '#333', color: '#fff' },
      });
    } else {
      toast.success(`Saved: ${title}`, {
        icon: '❤️',
        style: { borderRadius: '10px', background: '#ff385c', color: '#fff' },
      });
    }
  };

  return {
    saved: state.saved,
    count: state.saved.length,
    isSaved: (id: number) => state.saved.includes(id),
    toggle,
    isLoading: toggleMutation.isPending,
  };
};
