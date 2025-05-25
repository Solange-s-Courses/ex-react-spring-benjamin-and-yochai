import { useEffect } from 'react';
import { GAME_ACTIONS } from '../reducers/gameReducer';

/**
 * useErrorHandling Hook - Custom hook for managing error states
 * 
 * This hook provides automatic error handling that:
 * - Monitors error state changes
 * - Automatically clears errors after 3 seconds
 * - Cleans up timeouts on unmount
 * - Prevents memory leaks
 * - Maintains consistent error display duration
 * 
 * @param {Object} error - Current error state object
 * @param {Function} dispatch - Reducer dispatch function
 */
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