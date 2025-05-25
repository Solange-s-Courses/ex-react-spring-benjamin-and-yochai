import React from 'react';

/**
 * GameStats Component - Displays current game statistics
 * 
 * This component shows real-time game information including:
 * - Player name and selected category
 * - Current game time in MM:SS format
 * - Number of attempts made
 * - Updates dynamically during gameplay
 * - Maintains consistent styling
 * 
 * @returns {Element} The rendered GameStats component with game information
 * @constructor
 * @param {Object} props - Component props
 * @param {string} props.playerName - Name of the player
 * @param {string} props.category - Selected word category
 * @param {number} props.time - Game time in seconds
 * @param {number} props.attempts - Number of attempts made
 */
function GameStats({ playerName, category, time, attempts }) {
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

    return (
        <div className="d-flex justify-content-between mb-4">
            <div>
                <strong>player:</strong> {playerName}
            </div>
            <div>
                <strong>category:</strong> {category}
            </div>
            <div>
                <strong>time:</strong> {formatTime(time)}
            </div>
            <div>
                <strong>attempts:</strong> {attempts}
            </div>
        </div>
    );
}

export default GameStats;