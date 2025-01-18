export default function FormLayout({ title, children, className = '' }) {
    return (
        <div className="container">
            <h1>{title}</h1>
            <form className={`form-container ${className}`}>
                {children}
            </form>
        </div>
    );
} 