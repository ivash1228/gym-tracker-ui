import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        const loadGoogleScript = () => {
            if (window.google && window.google.accounts) {
                window.google.accounts.id.initialize({
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                    callback: handleCredentialResponse,
                    auto_select: false,
                    cancel_on_tap_outside: true
                });

                window.google.accounts.id.renderButton(
                    document.getElementById('googleButton'),
                    { 
                        theme: 'filled_blue',
                        size: 'large',
                        text: "signin_with",
                        shape: "rectangular"
                    }
                );
            } else {
                setTimeout(loadGoogleScript, 100);
            }
        };

        loadGoogleScript();
    }, []);

    const handleCredentialResponse = (response) => {
        localStorage.setItem('idToken', response.credential);
        navigate('/clients');
    };

    return (
        <div className="container">
            <h1>Gym Tracker</h1>
            <div id="googleButton" className="form-container"></div>
        </div>
    );
}