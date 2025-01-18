export default function FormInput({ 
    name, 
    value, 
    onChange, 
    type = 'text', 
    placeholder,
    error
}) {
    return (
        <div className="input-container">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`input ${error ? 'input-error' : ''}`}
            />
            {error && <span className="error">{error}</span>}
        </div>
    );
} 