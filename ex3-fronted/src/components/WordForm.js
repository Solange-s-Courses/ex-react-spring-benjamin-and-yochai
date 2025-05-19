import React from 'react';

function WordForm({
                      categories,
                      onAddWord,
                      onUpdateWord,
                      editingWord,
                      setEditingWord,
                      isSubmitting,
                      existingWords
                  }) {
    const [formData, setFormData] = React.useState({
        word: '',
        hint: '',
        category: '',
        newCategory: ''
    });
    const [errors, setErrors] = React.useState({});

    // Update form data when editing a word
    React.useEffect(() => {
        if (editingWord) {
            setFormData({
                word: editingWord.word,
                hint: editingWord.hint,
                category: editingWord.category,
                newCategory: ''
            });
        } else {
            setFormData({
                word: '',
                hint: '',
                category: '',
                newCategory: ''
            });
        }
        setErrors({});
    }, [editingWord]);

    const validateForm = () => {
        const newErrors = {};
        const wordPattern = /^[a-zA-Z]+$/;

        // Validate word
        if (formData.word.trim().length === 0) {
            newErrors.word = 'Please enter a word';
        } else if (!wordPattern.test(formData.word.trim())) {
            newErrors.word = 'Word can only contain letters (a-z)';
        } else if (!editingWord && existingWords.some(
            word => word.word.toLowerCase() === formData.word.trim().toLowerCase()
        )) {
            newErrors.word = 'This word already exists';
        }

        // Validate hint
        if (formData.hint.trim().length === 0) {
            newErrors.hint = 'Please enter a hint';
        }

        // Validate category (either selected or new)
        if (!formData.category && !formData.newCategory) {
            newErrors.category = 'Please select a category or create a new one';
        }

        // Validate new category format if provided
        if (formData.newCategory && !wordPattern.test(formData.newCategory.trim())) {
            newErrors.newCategory = 'Category can only contain letters (a-z)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const wordData = {
            word: formData.word.trim().toLowerCase(),
            hint: formData.hint.trim(),
            category: formData.newCategory
                ? formData.newCategory.trim().toLowerCase()
                : formData.category.toLowerCase()
        };

        try {
            let success;
            if (editingWord) {
                success = await onUpdateWord(editingWord.word, wordData);
            } else {
                success = await onAddWord(wordData);
            }

            if (success) {
                setFormData({
                    word: '',
                    hint: '',
                    category: '',
                    newCategory: ''
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleCancel = () => {
        setFormData({
            word: '',
            hint: '',
            category: '',
            newCategory: ''
        });
        setEditingWord(null);
        setErrors({});
    };

    return (
        <div className="card mb-4">
            <div className="card-header">
                <h4>{editingWord ? 'Edit Word' : 'Add New Word'}</h4>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit} className="text-start">
                    {/* Word input */}
                    <div className="mb-3">
                        <label htmlFor="word" className="form-label">Word</label>
                        <input
                            type="text"
                            className={`form-control ${errors.word ? 'is-invalid' : ''}`}
                            id="word"
                            name="word"
                            value={formData.word}
                            onChange={handleChange}
                            placeholder="Enter word (a-z letters only)"
                            disabled={isSubmitting}
                            required
                            pattern="[a-zA-Z]+"
                        />
                        <div className="invalid-feedback">{errors.word}</div>
                    </div>

                    {/* Hint input */}
                    <div className="mb-3">
                        <label htmlFor="hint" className="form-label">Hint</label>
                        <input
                            type="text"
                            className={`form-control ${errors.hint ? 'is-invalid' : ''}`}
                            id="hint"
                            name="hint"
                            value={formData.hint}
                            onChange={handleChange}
                            placeholder="Enter hint"
                            disabled={isSubmitting}
                            required
                        />
                        <div className="invalid-feedback">{errors.hint}</div>
                    </div>

                    {/* Category selection */}
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Select Category</label>
                        <select
                            className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <div className="invalid-feedback">{errors.category}</div>
                    </div>

                    {/* New category input */}
                    <div className="mb-3">
                        <label htmlFor="newCategory" className="form-label">Or Create New Category</label>
                        <input
                            type="text"
                            className={`form-control ${errors.newCategory ? 'is-invalid' : ''}`}
                            id="newCategory"
                            name="newCategory"
                            value={formData.newCategory}
                            onChange={handleChange}
                            placeholder="Enter new category (a-z letters only)"
                            disabled={isSubmitting}
                            pattern="[a-zA-Z]*"
                        />
                        <div className="invalid-feedback">{errors.newCategory}</div>
                    </div>

                    {/* Submit buttons */}
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                    {editingWord ? 'Updating...' : 'Adding...'}
                                </>
                            ) : (
                                editingWord ? 'Update Word' : 'Add Word'
                            )}
                        </button>
                        {editingWord && (
                            <button
                                className="btn btn-secondary"
                                type="button"
                                onClick={handleCancel}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default WordForm;