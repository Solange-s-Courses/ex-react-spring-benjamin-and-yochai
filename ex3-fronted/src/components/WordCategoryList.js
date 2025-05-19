import React from 'react';
import WordTable from './WordTable';

function WordCategoryList({ 
    categories, 
    words, 
    onEdit, 
    onDelete, 
    isLoading, 
    isSubmitting 
}) {
    // Group words by category
    const wordsByCategory = categories.reduce((acc, category) => {
        acc[category] = words.filter(
            word => word.category.toLowerCase() === category.toLowerCase()
        );
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
        <>
            {Object.entries(wordsByCategory).map(([category, categoryWords]) => {
                if (categoryWords.length === 0) return null;
                
                return (
                    <div key={category} className="card mb-4">
                        <div className="card-header bg-light">
                            <h5 className="mb-0">{category}</h5>
                        </div>
                        <div className="card-body">
                            <WordTable 
                                words={categoryWords}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                isSubmitting={isSubmitting}
                            />
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default WordCategoryList; 