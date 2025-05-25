import React from 'react';

/**
 * WordRow Component - Individual row in the words table
 * 
 * This component renders a single row in the words table that:
 * - Displays word and hint information
 * - Provides edit and delete action buttons
 * - Handles user interactions for word management
 * - Maintains consistent styling with the table
 * 
 * @returns {Element} The rendered WordRow component with word information and actions
 * @constructor
 * @param {Object} props - Component props
 * @param {Object} props.word - Word object containing word and hint
 * @param {Function} props.onEdit - Callback for editing the word
 * @param {Function} props.onDelete - Callback for deleting the word
 */
function WordRow({ word, onEdit, onDelete }) {
    return (
        <tr>{/*key={word.word}>*/}
            <td>{word.word}</td>
            <td>{word.hint}</td>
            <td>
                <div className="btn-group btn-group-sm">
                    <button 
                        className="btn btn-primary"
                        onClick={() => onEdit(word)}
                    >
                        Edit
                    </button>
                    <button 
                        className="btn btn-danger"
                        onClick={() => onDelete(word)}
                    >
                        Delete
                    </button>
                </div>
            </td>
      </tr>
    );
}

export default WordRow; 