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