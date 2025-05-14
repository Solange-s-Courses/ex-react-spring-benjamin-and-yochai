import { useEffect } from 'react';
import { GAME_ACTIONS, GAME_STATUS } from '../reducers/gameReducer';
import { mockAPI } from '../gameData';

export function useScoreCalculation(gameStatus, state, dispatch, navigate) {
  useEffect(() => {
    if (gameStatus === GAME_STATUS.WON) {
      const calculateAndSaveScore = async () => {
        const baseScore = 1000;
        const timePenalty = state.gameTime * 2;
        const attemptsPenalty = state.attempts * 10;
        const hintPenalty = state.showHint ? 100 : 0;
        const finalScore = Math.max(0, baseScore - timePenalty - attemptsPenalty - hintPenalty);

        dispatch({
          type: GAME_ACTIONS.SET_SCORE,
          payload: finalScore
        });

        try {
          const scoreData = {
            playerName: state.playerName,
            score: finalScore,
            category: state.category,
            word: state.word,
            attempts: state.attempts,
            timeInSeconds: state.gameTime,
            usedHint: state.showHint
          };

          await mockAPI.saveScore(scoreData);
        } catch (err) {
          console.error('Error saving score:', err);
          dispatch({
            type: GAME_ACTIONS.SET_ERROR,
            payload: err.message
          });
        }
      };

      calculateAndSaveScore();
    }
  }, [gameStatus, state, dispatch, navigate]);
} 