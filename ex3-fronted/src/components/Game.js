import React, { useReducer, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gameReducer, { initialGameState, GAME_ACTIONS, GAME_STATUS } from '../reducers/gameReducer';
import WordDisplay from './WordDisplay';
import HintSection from './HintSection';
import GameStats from './GameStats';
//import LetterButtons from './LetterButtons';
import WordGuess from './WordGuess';
import GameResult from './GameResult';
import Layout from "./Layout";
import { mockAPI } from "../gameData";


/**
 * Main Game component that manages the word guessing game with pure reducer
 * @component
 * @returns {JSX.Element} The game component
 */
function Game() {
    const navigate = useNavigate();
    const location = useLocation();
    const [state, dispatch] = useReducer(gameReducer, initialGameState);
    const timerRef = useRef(null);

    // Initialize game with player data
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
                word: location.state.wordData.word,
                hint: location.state.wordData.hint
            }
        });


        //startNewGame(location.state.category);
    }, [location.state, navigate]);

    // Timer effect
    useEffect(() => {
        if (state.gameStarted && state.gameStatus === GAME_STATUS.PLAYING) {
            timerRef.current = setInterval(() => {
                dispatch({ type: GAME_ACTIONS.UPDATE_TIMER });
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }

        return () => clearInterval(timerRef.current);
    }, [state.gameStarted, state.gameStatus]);

    // Calculate and save score when game is won
    useEffect(() => {
        if (state.gameStatus === GAME_STATUS.WON) {
            calculateAndSaveScore();
        }
    }, [state.gameStatus]);

    // Clear error message after 3 seconds
    useEffect(() => {
        if (state.error) {
            const timeout = setTimeout(() => {
                dispatch({ type: GAME_ACTIONS.CLEAR_ERROR });
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [state.error]);

    /**
     * Start a new game by fetching a random word
     * @param {string} category - The category to fetch word from
     */
    /*const startNewGame = async (category) => {
        dispatch({ type: GAME_ACTIONS.SET_LOADING, payload: true });

        try {
            const wordData = await mockAPI.getRandomWord(category);
            dispatch({
                type: GAME_ACTIONS.SET_WORD_DATA,
                payload: wordData
            });
        } catch (err) {
            dispatch({
                type: GAME_ACTIONS.SET_ERROR,
                payload: err.message
            });
            setTimeout(() => navigate('/'), 3000);
        }
    };*/

    /**
     * Calculate score and save to local storage
     * This is a side effect, kept outside the reducer
     */
    const calculateAndSaveScore = async () => {
        // Calculate score logic
        const baseScore = 1000;
        const timePenalty = state.gameTime * 2;
        const attemptsPenalty = state.attempts * 10;
        const hintPenalty = state.showHint ? 100 : 0;

        const finalScore = Math.max(0, baseScore - timePenalty - attemptsPenalty - hintPenalty);

        // Update score in state
        dispatch({
            type: GAME_ACTIONS.SET_SCORE,
            payload: finalScore
        });

        // Save score to local storage (side effect)
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
        }
    };

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

    /**
     * Handle leaving the game
     */
    const handleLeaveGame = () => {
        clearInterval(timerRef.current);
        navigate('/');
    };

    /**
     * Handle starting a new game
     */
    const handleNewGame = () => {
        navigate('/');
    };

    /**
     * Handle showing leaderboard
     */
    const handleShowLeaderboard = () => {
        navigate('/leaderboard');
    };

    // Loading state
    if (state.loading) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // Error state
    if (state.error && !state.gameStarted) {
        return (
            <div className="container text-center mt-5">
                <div className="alert alert-danger" role="alert">
                    {state.error}
                </div>
                <button className="btn btn-primary" onClick={handleLeaveGame}>
                    Return to Home
                </button>
            </div>
        );
    }

    // Game complete screen
    if (state.gameStatus === GAME_STATUS.WON || state.gameStatus === GAME_STATUS.LOST) {
        return (
            <GameResult
                gameState={state}
                onNewGame={handleNewGame}
                onShowLeaderboard={handleShowLeaderboard}
            />
        );
    }

    // Main game screen
    return (

        <Layout title={
            <div className="d-flex justify-content-between align-items-center">
                <span>Word Guessing Game</span>
                <button className="btn btn-danger btn-sm" onClick={handleLeaveGame}>
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
            {state.error && state.gameStarted && (
                <div className="alert alert-warning alert-dismissible fade show">
                    {state.error}
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

            {/* Letter guessing */}
            {/*<LetterButtons
                                guessedLetters={state.guessedLetters}
                                word={state.word}
                                onGuess={handleLetterGuess}
                                disabled={state.gameStatus !== GAME_STATUS.PLAYING}
                            />*/}

            {/* Word guessing */}
            <WordGuess
                onGuess={handleWordGuess}
                disabled={state.gameStatus !== GAME_STATUS.PLAYING}
            />
        </Layout>
    );
}

export default Game;