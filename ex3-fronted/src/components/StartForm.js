import React from "react";

/**
 * StartForm Component - Form for starting a new game
 * 
 * This component provides a form interface that:
 * - Collects player nickname with validation
 * - Allows selection of word category
 * - Handles form submission and validation
 * - Displays error messages
 * - Supports form state management
 * - Provides real-time category updates
 * 
 * @returns {Element} The rendered StartForm component with game initialization form
 * @constructor
 * @param {Object} props - Component props
 * @param {Object} props.errors - Form validation errors
 * @param {Function} props.handleChange - Input change handler
 * @param {Function} props.handleSubmit - Form submission handler
 * @param {boolean} props.disabled - Form disabled state
 * @param {Array} props.categories - Available word categories
 * @param {Object} props.formData - Current form data
 * @param {Function} props.reload - Function to reload categories
 */
function StartForm({errors, handleChange, handleSubmit, disabled, categories, formData, reload}) {
    return (
        <form onSubmit={handleSubmit} className="text-start">
            <div className="mb-3">
                <label htmlFor="nickname" className="form-label">Nickname (must be
                    unique)</label>
                <input
                    type="text"
                    className={`form-control ${errors.nickname ? "is-invalid" : ""}`}
                    id="nickname"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    placeholder="Enter your nickname"
                    disabled={disabled}
                />
                <div className="invalid-feedback">{errors.nickname}</div>
            </div>

            <div className="mb-4">
                <label htmlFor="category" className="form-label">Choose a Word Category</label>
                <select
                    className={`form-control ${errors.category ? "is-invalid" : ""}`}
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    onClick={reload}
                    disabled={disabled}
                >
                    <option value="">Select a category</option>
                    {Object.entries(categories).map(([key, value]) => (
                        <option key={key} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
                <div className="invalid-feedback">{errors.category}</div>
            </div>

            <div className="d-grid">
                <button
                    className={'btn btn-success btn-lg'}
                    type="submit"
                    disabled={disabled}
                >
                    Start Game!
                </button>
                <div className="text-danger">{errors.general}</div>
            </div>
        </form>
    )
}

export default StartForm;