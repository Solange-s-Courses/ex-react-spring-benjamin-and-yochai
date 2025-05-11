import React from 'react';

/**
 * Component for displaying game statistics
 * @component
 * @param {Object} props - Component props
 * @param {string} props.playerName - Name of the player
 * @param {string} props.category - Selected category
 * @param {number} props.time - Game time in seconds
 * @param {number} props.attempts - Number of attempts
 * @returns {JSX.Element} The game stats component
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