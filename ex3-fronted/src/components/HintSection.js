import React from 'react';

/**
 * Component for displaying hints
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.showHint - Whether to show the hint
 * @param {string} props.hint - The hint text
 * @param {Function} props.onShowHint - Function to handle showing hint
 * @returns {JSX.Element} The hint section component
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