import React from "react";

function StartForm({errors, handleChange, handleSubmit, disabled, categories, formData}) {
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
                    required
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