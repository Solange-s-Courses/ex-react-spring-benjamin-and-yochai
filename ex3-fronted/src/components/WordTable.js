import React from 'react';
import WordRow from './WordRow';

function WordTable({ words, onEdit, onDelete, isSubmitting }) {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Word</th>
                        <th>Hint</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {words.map((word) => (
                        <WordRow 
                            key={`${word.category}-${word.word}`}
                            word={word}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            isSubmitting={isSubmitting}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default WordTable; 