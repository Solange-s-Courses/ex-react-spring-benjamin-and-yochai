import React from 'react';

/**
 * WordForm Component - Form for adding and editing words in the game database
 * 
 * This component provides a comprehensive form interface for:
 * - Adding new words with associated hints and categories
 * - Editing existing words and their properties
 * - Validating word format (letters only)
 * - Managing custom categories
 * - Handling both creation and update operations
 * 
 * @returns {Element} The rendered WordForm component with input fields and validation
 * @constructor
 * @param {Object} props - Component props
 * @param {Array} props.categories - List of available word categories
 * @param {Function} props.sendRequest - Function to send API requests
 * @param {Object} props.editingWord - Word object being edited (empty for new words)
 * @param {Function} props.setEditingWord - Function to update editing state
 * @param {boolean} props.isSubmitting - Loading state indicator
 * @param {Array} props.existingWords - List of existing words for validation
 */
function WordForm({
                      categories,
                      sendRequest,
                      editingWord,
                      setEditingWord,
                      isSubmitting,
                      existingWords
                  }) {
    const [formData, setFormData] = React.useState({ ...editingWord });
    const [errors, setErrors] = React.useState({});
    const isEditing = Object.keys(editingWord).length !== 0;

    const validateForm = () => {
        const newErrors = {};
        const wordPattern = /^[a-zA-Z]+$/;

        // Validate word
        if (!isEditing) {
            if (!formData.word || formData.word.trim().length === 0) {
                newErrors.word = 'Please enter a word';
            } else if (!wordPattern.test(formData.word.trim())) {
                newErrors.word = 'Word can only contain letters (a-z)';
            } else if (!editingWord && existingWords.some(
                word => word.word.toLowerCase() === formData.word.trim().toLowerCase()
            )) {
                newErrors.word = 'This word already exists';
            }
        }

        // Validate hint
        if (!formData.hint || formData.hint.trim().length === 0) {
            newErrors.hint = 'Please enter a hint';
        }

        // Validate category (either selected or new)
        if (!formData.category || formData.category.trim().length === 0) {
            newErrors.category = 'Please select a category or create a new one';
        }else if (formData.category === 'other' &&(!formData.customCategory || !wordPattern.test(formData.customCategory.trim()))) {
            newErrors.category = 'Category can only contain letters (a-z)';
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
            category: (formData.category === 'other' ? formData.customCategory.trim().toLowerCase() : formData.category.trim().toLowerCase())
        };

        const method = isEditing ? 'PUT' : 'POST';
        const success = await sendRequest(method, wordData);

        if (success) {
            setFormData({});
            setEditingWord(null);
        }
    };

    return (
        <div className="card mb-4">
            <div className="card-header">
                <h4>{isEditing ? 'Edit Word' : 'Add New Word'}</h4>
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
                            value={formData.word || ''}
                            onChange={handleChange}
                            placeholder="Enter word (a-z letters only)"
                            disabled={isEditing || isSubmitting}
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
                            <option key=" " value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                            <option key="other" value="other">Other</option>
                        </select>

                        {formData.category === 'other' && (
                            <input
                                type="text"
                                id="customCategory"
                                name="customCategory"
                                value={formData.customCategory || ''}
                                onChange={handleChange}
                                placeholder="Enter custom category"
                                className={`form-control mt-1 ${errors.category ? 'is-invalid' : ''}`}
                            />
                        )}

                        <div className="invalid-feedback">{errors.category}</div>
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
                                isEditing ? 'Update Word' : 'Add Word'
                            )}
                        </button>
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={()=> {
                                setEditingWord(null);
                            }}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default WordForm;