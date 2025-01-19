import '../styles/button.css';

const Button = ({ 
    children, 
    onClick, 
    variant = 'primary', 
    type = 'button',
    fullWidth,
    className,
    ...props 
}) => {
    const baseStyles = {
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: fullWidth ? '100%' : 'auto',
        marginBottom: '10px'
    };

    const variantStyles = {
        primary: {
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-text-primary)'
        },
        secondary: {
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-text-primary)'
        },
        success: {
            backgroundColor: 'var(--color-success)',
            color: 'var(--color-text-primary)'
        }
    };

    return (
        <button
            onClick={onClick}
            type={type}
            className={`button ${variant} ${fullWidth ? 'full-width' : ''} ${className}`}
            style={{
                ...baseStyles,
                ...variantStyles[variant]
            }}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;