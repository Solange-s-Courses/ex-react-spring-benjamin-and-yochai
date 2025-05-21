import { useEffect } from 'react';
import { GAME_ACTIONS } from '../reducers/gameReducer';

export function useErrorHandling(error, dispatch) {
  useEffect(() => {
    if (Object.keys(error).length > 0) {
      const timeout = setTimeout(() => {
        dispatch({ type: GAME_ACTIONS.CLEAR_ERROR });
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [error, dispatch]);
} 