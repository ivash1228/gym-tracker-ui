export default function FormSelect({ 
    name, 
    value, 
    onChange, 
    options,
    error 
}) {
    return (
        <div className="input-container">
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={`input ${error ? 'input-error' : ''}`}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className="error">{error}</span>}
        </div>
    );
} 