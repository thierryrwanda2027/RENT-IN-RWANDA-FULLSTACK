import { produce } from 'immer';
import type { State, Action } from './types';

export const reducer = produce((draft: State, action: Action): void => {
  switch (action.type) {
    case 'SET_LISTINGS':
      draft.listings = action.payload;
      break;
    case 'SET_LOADING':
      draft.loading = action.payload;
      break;
    case 'SET_FILTER':
      draft.filter = action.payload;
      break;
    case 'TOGGLE_FAVORITE': {
      const id = action.payload;
      const index = draft.saved.indexOf(id);
      if (index > -1) {
        draft.saved.splice(index, 1);
      } else {
        draft.saved.push(id);
      }
      break;
    }
    case 'RESET':
      draft.filter = '';
      draft.saved = [];
      break;
  }
});
