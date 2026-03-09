import { useRef } from 'react';

export default function ResumeUpload({ file, onChange, disabled }) {
    const inputRef = useRef(null);

    return (
        <div className="resume-upload">
            <label className="role-label">Resume (PDF)</label>
            <div
                className={`drop-zone ${disabled ? 'drop-zone--disabled' : ''}`}
                onClick={() => !disabled && inputRef.current?.click()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="application/pdf"
                    style={{ display: 'none' }}
                    onChange={(e) => onChange(e.target.files[0])}
                    disabled={disabled}
                />
                {file ? (
                    <div className="drop-zone__file">
                        <span className="drop-zone__icon">📄</span>
                        <span className="drop-zone__name">{file.name}</span>
                        <span className="drop-zone__size">
                            ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                    </div>
                ) : (
                    <div className="drop-zone__placeholder">
                        <span className="drop-zone__icon">📂</span>
                        <span>Click to upload your PDF resume</span>
                        <span className="drop-zone__hint">Max 5MB · PDF only</span>
                    </div>
                )}
            </div>
        </div>
    );
}
