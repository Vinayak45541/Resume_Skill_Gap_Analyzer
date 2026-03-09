const ROLES = [
    'Backend Developer',
    'Frontend Developer',
    'Full Stack Developer',
    'Machine Learning Engineer',
    'Data Scientist',
    'DevOps Engineer',
    'Cloud Engineer',
    'Mobile App Developer',
    'UI/UX Designer',
    'Cybersecurity Engineer',
];

export default function RoleSelector({ value, onChange, disabled }) {
    return (
        <div className="role-selector">
            <label className="role-label">Target Role</label>
            <div className="role-select-wrapper">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    className="role-select"
                >
                    <option value="">— Select a role —</option>
                    {ROLES.map((r) => (
                        <option key={r} value={r}>
                            {r}
                        </option>
                    ))}
                </select>
                <span className="role-select-arrow">▾</span>
            </div>
        </div>
    );
}
