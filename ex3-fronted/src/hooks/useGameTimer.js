import { useEffect, useRef } from 'react';
import { GAME_ACTIONS, GAME_STATUS } from '../reducers/gameReducer';

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