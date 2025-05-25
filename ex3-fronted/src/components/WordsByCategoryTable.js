import React from "react";
import WordRow from "./WordRow";

function WordsByCategoryTable({
                                  words,
                                  onEdit,
                                  onDelete,
                                  isSubmitting
    }){

    const wordsByCategory = words.reduce((acc, word) => {
        const category = word.category.toLowerCase(); // normalize case if needed
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
                        <>
                            <tr key={"category:"+category} className='thead table-secondary'>
                                <th colSpan='3' className="text-center" >{category}</th>
                            </tr>
                            {words.map(word => (
                                <WordRow
                                    word={word}
                                    isSubmitting={isSubmitting}
                                    onDelete={onDelete}
                                    onEdit={onEdit}/>
                            ))}
                        </>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default WordsByCategoryTable;