import { useState } from 'react';
import RoleSelector from '../components/RoleSelector.jsx';
import ResumeUpload from '../components/ResumeUpload.jsx';
import ScoreCard from '../components/ScoreCard.jsx';
import SkillsSection from '../components/SkillsSection.jsx';
import Suggestions from '../components/Suggestions.jsx';
import { analyzeResume, reanalyzeResume } from '../services/api.js';

export default function Analyzer() {
    const [role, setRole] = useState('');
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [resumeText, setResumeText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasUploaded, setHasUploaded] = useState(false);

    // --- Initial analysis (with PDF) ---
    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!role) return setError('Please select a target role.');
        if (!file) return setError('Please upload your resume PDF.');

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const data = await analyzeResume(role, file);
            if (data.error) throw new Error(data.error);
            setResult(data);
            // Cache resume text for role-switching
            if (data.resumeText) setResumeText(data.resumeText);
            setHasUploaded(true);
        } catch (err) {
            setError(err.response?.data?.error || err.message || 'Analysis failed.');
        } finally {
            setLoading(false);
        }
    };

    // --- Role switch (no re-upload) ---
    const handleRoleChange = async (newRole) => {
        setRole(newRole);
        if (!hasUploaded || !resumeText || newRole === role) return;

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const data = await reanalyzeResume(newRole, resumeText);
            if (data.error) throw new Error(data.error);
            setResult(data);
        } catch (err) {
            setError(err.response?.data?.error || err.message || 'Re-analysis failed.');
        } finally {
            setLoading(false);
        }
    };

    // --- Reset ---
    const handleReset = () => {
        setRole('');
        setFile(null);
        setResult(null);
        setResumeText('');
        setError('');
        setHasUploaded(false);
    };

    return (
        <div className="analyzer-page">
            {/* Header */}
            <header className="app-header">
                <div className="app-header__inner">
                    <div className="app-logo">
                        <span className="app-logo__icon">🎯</span>
                        <div>
                            <h1 className="app-logo__title">Skill Gap Analyzer</h1>
                            <p className="app-logo__sub">AI-powered resume × role compatibility</p>
                        </div>
                    </div>
                    {hasUploaded && (
                        <button className="btn btn--ghost" onClick={handleReset}>
                            ↩ New Resume
                        </button>
                    )}
                </div>
            </header>

            <main className="analyzer-main">
                {/* Upload Form */}
                <section className="upload-card">
                    <form onSubmit={handleAnalyze}>
                        <div className="upload-card__fields">
                            <RoleSelector
                                value={role}
                                onChange={hasUploaded ? handleRoleChange : setRole}
                                disabled={loading}
                            />
                            {!hasUploaded && (
                                <ResumeUpload
                                    file={file}
                                    onChange={setFile}
                                    disabled={loading}
                                />
                            )}
                        </div>

                        {!hasUploaded && (
                            <button
                                type="submit"
                                className={`btn btn--primary btn--full ${loading ? 'btn--loading' : ''}`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner" />
                                        Analyzing…
                                    </>
                                ) : (
                                    '🔍 Analyze Resume'
                                )}
                            </button>
                        )}
                    </form>

                    {hasUploaded && loading && (
                        <div className="reanalyze-loader">
                            <span className="spinner" />
                            <span>Re-analyzing for <strong>{role}</strong>…</span>
                        </div>
                    )}

                    {error && <div className="error-banner">{error}</div>}
                </section>

                {/* Results */}
                {result && !loading && (
                    <section className="results-section" id="results">
                        <ScoreCard
                            role={result.role}
                            score={result.compatibility_score}
                            summary={result.summary}
                        />
                        <SkillsSection
                            detected={result.skills_detected}
                            missing={result.missing_skills}
                            strengths={result.resume_strengths}
                        />
                        <Suggestions
                            suggestions={result.improvement_suggestions}
                            guidance={result.career_guidance}
                        />
                    </section>
                )}
            </main>
        </div>
    );
}
