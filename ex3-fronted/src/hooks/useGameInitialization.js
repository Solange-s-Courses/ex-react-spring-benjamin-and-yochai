import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GAME_ACTIONS } from '../reducers/gameReducer';

/**
 * useGameInitialization Hook - Custom hook for initializing game state
 * 
 * This hook handles game initialization that:
 * - Validates required game data from location state
 * - Redirects to home if data is missing
 * - Initializes game state with player info
 * - Sets up word data and category
 * - Manages navigation state
 * - Ensures proper game setup
 * 
 * @param {Object} state - Current game state
 * @param {Function} dispatch - Reducer dispatch function
 * @param {Function} navigate - Navigation function from react-router
 * @returns {Object} Location state containing game initialization data
 */
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