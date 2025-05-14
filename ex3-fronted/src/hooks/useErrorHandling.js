import { useEffect } from 'react';
import { GAME_ACTIONS } from '../reducers/gameReducer';

export function useErrorHandling(error, dispatch) {
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        dispatch({ type: GAME_ACTIONS.CLEAR_ERROR });
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [error, dispatch]);
} 