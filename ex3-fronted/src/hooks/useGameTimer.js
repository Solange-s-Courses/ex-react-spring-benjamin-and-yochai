import { useEffect, useRef } from 'react';
import { GAME_ACTIONS, GAME_STATUS } from '../reducers/gameReducer';

/**
 * useGameTimer Hook - Custom hook for managing game timer
 * 
 * This hook provides game timing functionality that:
 * - Starts timer when game is playing
 * - Stops timer when game is paused or ended
 * - Updates game time every second
 * - Cleans up intervals on unmount
 * - Prevents memory leaks
 * - Maintains accurate game duration
 * 
 * @param {string} gameStatus - Current game status from GAME_STATUS enum
 * @param {Function} dispatch - Reducer dispatch function
 */
export function useGameTimer(gameStatus, dispatch) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (gameStatus === GAME_STATUS.PLAYING) {
      timerRef.current = setInterval(() => {
        dispatch({ type: GAME_ACTIONS.UPDATE_TIMER });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [gameStatus, dispatch]);
} 