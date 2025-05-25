import React from 'react';

/**
 * HintSection Component - Displays and manages game hints
 * 
 * This component provides a hint system that:
 * - Shows a button to reveal hints
 * - Displays hint text in a styled alert
 * - Handles hint visibility state
 * - Maintains consistent styling
 * - Provides clear user feedback
 * 
 * @returns {Element} The rendered HintSection component with hint controls
 * @constructor
 * @param {Object} props - Component props
 * @param {boolean} props.showHint - Whether the hint is currently visible
 * @param {string} props.hint - The hint text to display
 * @param {Function} props.onShowHint - Callback for showing the hint
 */
function HintSection({ showHint, hint, onShowHint }) {
    return (
        <div className="text-center mb-4">
            {!showHint ? (
                <button
                    className="btn btn-info"
                    onClick={onShowHint}
                >
                    Show Hint
                </button>
            ) : (
                <div className="alert alert-info">
                    <strong>Hint:</strong> {hint}
                </div>
            )}
        </div>
    );
}

export default HintSection;