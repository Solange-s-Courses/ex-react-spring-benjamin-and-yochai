import React from "react";
import WordRow from "./WordRow";

/**
 * WordsByCategoryTable Component - Displays words organized by categories
 * 
 * This component renders a structured table view that:
 * - Groups words by their categories
 * - Displays word and hint information
 * - Provides edit and delete actions for each word
 * - Shows a message when no words are available
 * - Maintains responsive table layout
 * 
 * @returns {Element} The rendered WordsByCategoryTable component with categorized word list
 * @constructor
 * @param {Object} props - Component props
 * @param {Array} props.words - List of word objects to display
 * @param {Function} props.onEdit - Callback for editing a word
 * @param {Function} props.onDelete - Callback for deleting a word
 */
function WordsByCategoryTable({
                                  words,
                                  onEdit,
                                  onDelete
    }){

    /**
     * Groups words by their categories
     * 
     * This function groups words by their categories.
     * It creates an object where each key is a category and the value is an array of words in that category.
     * 
     */
    const wordsByCategory = words.reduce((acc, word) => {
        const category = word.category.toLowerCase();
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(word);
        return acc;
    }, {});


    if (words.length === 0) {
        return (
            <div className="alert alert-info">
                No words available. Add some words above.
            </div>
        );
    }

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                <tr className="table-secondary">
                    <th className={"col-2"}>Word</th>
                    <th className={"col-8"}>Hint</th>
                    <th className={"col-2"}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    Object.entries(wordsByCategory).map(([category, words])=> (
                        <React.Fragment key={category}>
                            <tr className='thead table-secondary'>
                                <th colSpan='3' className="text-center">{category}</th>
                            </tr>
                            {words.map(word => (
                                <WordRow
                                    key={word.word}
                                    word={word}
                                    onDelete={onDelete}
                                    onEdit={onEdit}/>
                            ))}
                        </React.Fragment>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default WordsByCategoryTable;