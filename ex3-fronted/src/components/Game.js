import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import gameReducer, { initialGameState, GAME_ACTIONS, GAME_STATUS } from '../reducers/gameReducer';
import WordDisplay from './WordDisplay';
import HintSection from './HintSection';
import GameStats from './GameStats';
import WordLetterGuess from './WordLetterGuess';
import GameResult from './GameResult';
import Layout from "./Layout";
import { useGameInitialization } from '../hooks/useGameInitialization';
import { useGameTimer } from '../hooks/useGameTimer';
import { useErrorHandling } from '../hooks/useErrorHandling';
import Spinner from "./Spinner";

/**
 * Main Game component that manages the word guessing game with pure reducer
 * @component
 * @returns {JSX.Element} The game component
 */
function Game() {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(gameReducer, initialGameState);
    
    // Custom hooks for game logic
    useGameInitialization(state, dispatch, navigate);
    useGameTimer(state.gameStatus, dispatch);
    useErrorHandling(state.error, dispatch);

    /**
     * Handle letter guess
     * @param {string} letter - The letter to guess
     */
    const handleLetterGuess = (letter) => {
        dispatch({
            type: GAME_ACTIONS.GUESS_LETTER,
            payload: { letter }
        });
    };

    /**
     * Handle full word guess
     * @param {string} guess - The full word guess
     */
    const handleWordGuess = (guess) => {
        dispatch({
            type: GAME_ACTIONS.GUESS_WORD,
            payload: { guess }
        });
    };

    /**
     * Handle showing hint
     */
    const handleShowHint = () => {
        dispatch({ type: GAME_ACTIONS.SHOW_HINT });
    };

    // Loading state
    if (state.loading) {
        return (
            <Spinner />
        );
    }

    // Error state
    if (state.error?.fatal && state.gameStatus !== GAME_STATUS.PLAYING) {
        return (
            <div className="container text-center mt-5">
                <div className="alert alert-danger" role="alert">
                    {state.error.fatal}
                </div>
                <button className="btn btn-primary" onClick={()=> navigate('/')}>
                    Return to Home
                </button>
            </div>
        );
    }

    // Game complete screen
    if (state.gameStatus === GAME_STATUS.WON) {
        return (
            <GameResult
                gameState={state}
            />
        );
    }

    // Main game screen
    return (
        <Layout title={
            <div className="d-flex justify-content-between align-items-center">
                <span>Word Guessing Game</span>
                <button className="btn btn-danger btn-sm" onClick={()=> navigate('/')}>
                    Leave Game
                </button>
            </div>
        }
        >
            {/* Game info */}
            <GameStats
                playerName={state.playerName}
                category={state.category}
                time={state.gameTime}
                attempts={state.attempts}
            />

            {/* Error message */}
            {state.error?.guess && state.gameStatus === GAME_STATUS.PLAYING && (
                <div className="alert alert-warning alert-dismissible fade show">
                    {state.error.guess}
                </div>
            )}

            {/* Word display */}
            <WordDisplay displayWord={state.displayWord} />

            {/* Hint section */}
            <HintSection
                showHint={state.showHint}
                hint={state.hint}
                onShowHint={handleShowHint}
            />

            {/* Word guessing */}
            <WordLetterGuess
                onGuessWord={handleWordGuess}
                onGuessLetter={handleLetterGuess}
                disabled={state.gameStatus !== GAME_STATUS.PLAYING}
                validationError={state.error?.validation || ''}
                dispatch = {dispatch}
            />
        </Layout>
    );
}

export default Game;