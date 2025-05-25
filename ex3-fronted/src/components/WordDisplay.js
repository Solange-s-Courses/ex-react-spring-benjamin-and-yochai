/**
 * WordDisplay Component - Shows the current word state
 * 
 * This component displays the word being guessed that:
 * - Shows letters with spaces between them
 * - Uses monospace font for consistent spacing
 * - Updates as letters are guessed
 * - Maintains centered alignment
 * - Provides clear visual feedback
 * 
 * @returns {Element} The rendered WordDisplay component with word visualization
 * @constructor
 * @param {Object} props - Component props
 * @param {Array} props.displayWord - Array of characters representing the word
 */
function WordDisplay({ displayWord }) {
    return (
        <div className="text-center mb-4">
            <h1 className="display-4 font-monospace">
                {displayWord.join(' ')}
            </h1>
        </div>
    );
}
export default WordDisplay;