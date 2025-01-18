import '../styles/button.css';

export default function Button({ onClick, children, variant = 'primary', fullWidth = false }) {
    return (
        <button
            onClick={onClick}
            className={`button ${variant} ${fullWidth ? 'full-width' : ''}`}
        >
            {children}
        </button>
    );
}