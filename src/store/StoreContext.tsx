import React, { createContext, useContext, useReducer } from 'react';
import { useLocalStorage } from '../shared/hooks/useLocalStorage';
import type { Dispatch } from 'react';
import type { State, Action } from './types';
import { reducer } from './reducer';

interface StoreContextType {
  state: State;
  dispatch: Dispatch<Action>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const initialState: State = {
  listings: [],
  loading: true,
  filter: '',
  saved: [],
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [persistedSaved, setPersistedSaved] = useLocalStorage<number[]>('saved', []);
  
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    saved: persistedSaved
  });

  // Sync state.saved back to localStorage hook
  React.useEffect(() => {
    setPersistedSaved(state.saved);
  }, [state.saved, setPersistedSaved]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
