export default function ScoreCard({ role, score, summary }) {
    const getScoreClass = (s) => {
        if (s >= 90) return 'score--excellent';
        if (s >= 75) return 'score--strong';
        if (s >= 60) return 'score--moderate';
        if (s >= 40) return 'score--weak';
        return 'score--poor';
    };

    const getLabel = (s) => {
        if (s >= 90) return 'Excellent Match';
        if (s >= 75) return 'Strong Match';
        if (s >= 60) return 'Moderate Match';
        if (s >= 40) return 'Weak Match';
        return 'Poor Match';
    };

    const circumference = 2 * Math.PI * 52; // r=52
    const dashOffset = circumference - (score / 100) * circumference;

    return (
        <div className={`score-card ${getScoreClass(score)}`}>
            <div className="score-card__left">
                <h2 className="score-card__role">{role}</h2>
                <p className="score-card__label">{getLabel(score)}</p>
                <p className="score-card__summary">{summary}</p>
            </div>
            <div className="score-card__right">
                <svg className="score-ring" viewBox="0 0 120 120" width="120" height="120">
                    <circle cx="60" cy="60" r="52" className="score-ring__bg" />
                    <circle
                        cx="60" cy="60" r="52"
                        className="score-ring__fill"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        transform="rotate(-90 60 60)"
                    />
                    <text x="60" y="64" className="score-ring__text" textAnchor="middle">{score}%</text>
                </svg>
            </div>
        </div>
    );
}
