export default function SkillsSection({ detected, missing, strengths }) {
    return (
        <div className="skills-grid">
            {/* Skills Detected */}
            <div className="skills-panel skills-panel--detected">
                <h3 className="skills-panel__title">
                    <span>✅</span> Skills Detected
                </h3>
                {detected?.length > 0 ? (
                    <ul className="skills-list">
                        {detected.map((s, i) => (
                            <li key={i} className="skill-chip skill-chip--detected">{s}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="skills-empty">No skills detected.</p>
                )}
            </div>

            {/* Missing Skills */}
            <div className="skills-panel skills-panel--missing">
                <h3 className="skills-panel__title">
                    <span>❌</span> Skill Gaps
                </h3>
                {missing?.length > 0 ? (
                    <ul className="skills-list">
                        {missing.map((s, i) => (
                            <li key={i} className="skill-chip skill-chip--missing">{s}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="skills-empty">No significant gaps found!</p>
                )}
            </div>

            {/* Resume Strengths */}
            <div className="skills-panel skills-panel--strengths">
                <h3 className="skills-panel__title">
                    <span>💪</span> Resume Strengths
                </h3>
                {strengths?.length > 0 ? (
                    <ul className="strengths-list">
                        {strengths.map((s, i) => (
                            <li key={i} className="strength-item">{s}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="skills-empty">No specific strengths listed.</p>
                )}
            </div>
        </div>
    );
}
