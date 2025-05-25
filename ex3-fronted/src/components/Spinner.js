import React from "react";

/**
 * Spinner Component - Loading indicator
 * 
 * This component provides a simple loading spinner that:
 * - Displays a centered spinning animation
 * - Indicates loading or processing state
 * - Uses Bootstrap's spinner component
 * - Maintains consistent styling across the application
 * 
 * @returns {Element} The rendered Spinner component with loading animation
 * @constructor
 */
const Spinner = () => {
    return (
        <div className="container text-center mt-5">
            <div className="spinner-border" role="status"/>
        </div>
    );
}

export default Spinner;