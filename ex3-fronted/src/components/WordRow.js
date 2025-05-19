import React from 'react';

function WordRow({ word, onEdit, onDelete, isSubmitting }) {
    return (
        <tr>
            <td>{word.word}</td>
            <td>{word.hint}</td>
            <td>
                <div className="btn-group btn-group-sm">
                    <button 
                        className="btn btn-warning"
                        onClick={() => onEdit(word)}
                        disabled={isSubmitting}
                    >
                        Edit
                    </button>
                    <button 
                        className="btn btn-danger"
                        onClick={() => onDelete(word.word)}
                        disabled={isSubmitting}
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default WordRow; 