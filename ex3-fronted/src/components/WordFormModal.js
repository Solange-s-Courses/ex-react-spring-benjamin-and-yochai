import React from "react";
import {Modal} from "react-bootstrap";

function WordFormModal({
                           categories,
                           onAddWord,
                           onUpdateWord,
                           editingWord,
                           setEditingWord,
                           isSubmitting,
                           existingWords
                       })
{

    const [formData, setFormData] = React.useState({...editingWord});
    const [errors, setErrors] = React.useState({});

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
        <>
        {editingWord && (
        <div
            className="modal flex items-center justify-center "
            id="wordModal"
            //tabIndex="-1"
        >
            <div className="modal-dialog">
                <div className="modal-header flex justify-between items-center">
                    <h3 className="text-lg font-medium">
                        {Object.entries(editingWord).length > 0 ? 'Edit Item' : 'Add New Item'}
                    </h3>
                    <button
                        onClick={handleCancel}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>
                </div>
                <div className="modal-body p-6">
                    <form onSubmit={handleSubmit} className="text-start">
                        {/* Word input */}
                        <div className="mb-3">
                            <label htmlFor="word" className="form-label">Word</label>
                            <input
                                type="text"
                                className={`form-control ${errors.word ? 'is-invalid' : ''}`}
                                id="word"
                                name="word"
                                value={formData.word || ''}
                                onChange={handleChange}
                                placeholder="Enter word (a-z letters only)"
                                disabled={isSubmitting || Object.keys(editingWord).length !== 0}
                                required
                                //pattern="[a-zA-Z]+"
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
                                value={formData.hint || ''}
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
                                value={formData.category || ''}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            >
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                                <option value="Other">
                                    Other
                                </option>
                            </select>

                            {formData.category === 'Other' && (
                                <input
                                    type="text"
                                    value={formData.customCategory || ''}
                                    onChange={handleChange}
                                    placeholder="Enter custom category"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                                />
                            )}

                            <div className="invalid-feedback">{errors.category}</div>
                        </div>

                        {/* Submit buttons */}
                        <div className="modal-footer d-flex gap-2">
                            <button
                                className="btn btn-primary"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                            <span className="spinner-border spinner-border-sm me-1" role="status"
                                                  aria-hidden="true"></span>
                                        {editingWord ? 'Updating...' : 'Adding...'}
                                    </>
                                ) : (
                                    Object.keys(editingWord).length > 0 ? 'Update Word' : 'Add Word'
                                )}
                            </button>
                            <button
                                className="btn btn-secondary"
                                type="button"
                                onClick={handleCancel}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        )}
        </>
    )
}

export default WordFormModal;