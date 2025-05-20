import React from "react";
import WordRow from "./WordRow";

function WordsByCategoryTable({
                                  categories,
                                  words,
                                  onEdit,
                                  onDelete,
                                  isLoading,
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

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status"/>
            </div>
        );
    }

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
                        </React.Fragment>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default WordsByCategoryTable;