import React, { useState } from 'react';
import {GAME_ACTIONS} from "../reducers/gameReducer";

/**
 * WordLetterGuess Component - Input interface for word and letter guesses
 * 
 * This component provides a guessing interface that:
 * - Allows single letter or full word guesses
 * - Validates input for letters only
 * - Handles form submission and input clearing
 * - Shows validation error messages
 * - Supports disabled state during game transitions
 * - Maintains responsive input layout
 * 
 * @returns {Element} The rendered WordLetterGuess component with guess input
 * @constructor
 * @param {Object} props - Component props
 * @param {Function} props.onGuessWord - Function to handle word guess
 * @param {Function} props.onGuessLetter - Function to handle letter guess
 * @param {boolean} props.disabled - Whether input should be disabled
 * @param {string} props.validationError - Error message for invalid input
 * @param {Function} props.dispatch - Reducer dispatch function
 */
function WordLetterGuess({ onGuessWord, onGuessLetter, disabled, validationError, dispatch }) {
    const [guess, setGuess] = useState('');

    /**
     * Handle form submission
     * @param {Event} e - Form submit event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (guess.trim()) {
            if(/^[a-zA-Z]+$/.test(guess.trim())){
                if(guess.trim().length === 1){
                    onGuessLetter(guess.trim());
                }
                else {
                    onGuessWord(guess.trim());
                }
                setGuess('');
            }
            else {
                dispatch({
                    type: GAME_ACTIONS.SET_ERROR,
                    payload: {name: 'validation', message: 'Guess can contain only letters'}
                });
            }

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
                        placeholder="insert word or letter"
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
                <div className={"text-danger"}>{validationError}</div>
            </form>
        </div>
    );
}

export default WordLetterGuess;