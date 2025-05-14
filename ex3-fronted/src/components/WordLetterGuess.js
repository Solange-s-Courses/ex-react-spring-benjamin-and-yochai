import React, { useState } from 'react';

/**
 * Component for guessing the full word
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onGuessWord - Function to handle word guess
 * @param {Function} props.onGuessLetter - Function to handle letter guess
 * @param {boolean} props.disabled - Whether input should be disabled
 * @returns {JSX.Element} The word guess component
 */
function WordLetterGuess({ onGuessWord, onGuessLetter, disabled }) {
    const [guess, setGuess] = useState('');

    /**
     * Handle form submission
     * @param {Event} e - Form submit event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (guess.trim()) {
            if(guess.trim().length === 1){
                onGuessLetter(guess.trim());
            }
            else{
                onGuessWord(guess.trim());
            }
            setGuess('');
        }
    };

    return (
        <div className="text-center">
            <h5>Or guess the whole word:</h5>
            <form onSubmit={handleSubmit}>
                <div className="input-group justify-content-center">
                    <input
                        type="text"
                        className="form-control"
                        style={{ maxWidth: '300px' }}
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                        placeholder="insert word"
                        disabled={disabled}
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={disabled || !guess.trim()}
                    >
                        Guess
                    </button>
                </div>
            </form>
        </div>
    );
}

export default WordLetterGuess;