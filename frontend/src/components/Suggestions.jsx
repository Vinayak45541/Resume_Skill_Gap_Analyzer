export default function Suggestions({ suggestions, guidance }) {
    return (
        <div className="suggestions-section">
            {/* Improvement Suggestions */}
            <div className="suggestions-panel">
                <h3 className="suggestions-panel__title">
                    <span>💡</span> Improvement Suggestions
                </h3>
                {suggestions?.length > 0 ? (
                    <ol className="suggestions-list">
                        {suggestions.map((s, i) => (
                            <li key={i} className="suggestion-item">
                                <span className="suggestion-num">{i + 1}</span>
                                <span>{s}</span>
                            </li>
                        ))}
                    </ol>
                ) : (
                    <p className="skills-empty">No suggestions provided.</p>
                )}
            </div>

            {/* Career Guidance */}
            {guidance && (
                <div className="guidance-panel">
                    <h3 className="suggestions-panel__title">
                        <span>🚀</span> Career Guidance
                    </h3>
                    <p className="guidance-text">{guidance}</p>
                </div>
            )}
        </div>
    );
}
