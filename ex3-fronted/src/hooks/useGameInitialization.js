import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GAME_ACTIONS } from '../reducers/gameReducer';

export function useGameInitialization(state, dispatch, navigate) {
  const location = useLocation();

  useEffect(() => {
    if (!location.state || !location.state.playerName || !location.state.category || !location.state.wordData) {
      navigate('/');
      return;
    }

    dispatch({
      type: GAME_ACTIONS.INIT_GAME,
      payload: {
        playerName: location.state.playerName,
        category: location.state.category,
        wordData: location.state.wordData
      }
    });
  }, [location.state, navigate, dispatch]);

  return location.state;
} 