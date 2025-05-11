import React from 'react';
import { GAME_STATUS } from '../reducers/gameReducer';

/**
 * Component for displaying game results
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.gameState - Current game state
 * @param {Function} props.onNewGame - Function to start a new game
 * @param {Function} props.onShowLeaderboard - Function to show leaderboard
 * @returns {JSX.Element} The game result component
 */
function GameResult({ gameState, onNewGame, onShowLeaderboard }) {
    /**
     * Format time as MM:SS
     * @param {number} seconds - Time in seconds
     * @returns {string} Formatted time string
     */
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const isWon = gameState.gameStatus === GAME_STATUS.WON;

    return (
        <div className="container text-center mt-5">
            <div className="card shadow-lg">
                <div className={`card-header ${isWon ? 'bg-success text-white' : 'bg-danger text-white'}`}>
                    <h2>{isWon ? 'Congratulations! You Won!' : 'Game Over'}</h2>
                </div>
                <div className="card-body">
                    <h3 className="mb-3">The word was: <span className="text-primary">{gameState.word}</span></h3>

                    <div className="row justify-content-center mb-4">
                        <div className="col-md-6">
                            <div className="card bg-light">
                                <div className="card-body">
                                    <h5>Game Statistics</h5>
                                    <ul className="list-unstyled">
                                        <li><strong>Your Score:</strong> {gameState.score}</li>
                                        <li><strong>Time:</strong> {formatTime(gameState.gameTime)}</li>
                                        <li><strong>Attempts:</strong> {gameState.attempts}</li>
                                        <li><strong>Hint Used:</strong> {gameState.showHint ? 'Yes' : 'No'}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <button className="btn btn-primary me-2" onClick={onShowLeaderboard}>
                            View Leaderboard
                        </button>
                        <button className="btn btn-success" onClick={onNewGame}>
                            New Game
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameResult;