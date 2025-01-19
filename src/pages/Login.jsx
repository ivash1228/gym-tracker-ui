import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ROUTES } from '../constants/constants';

export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        const loadGoogleScript = () => {
            if (window.google && window.google.accounts) {
                window.google.accounts.id.initialize({
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                    callback: handleCredentialResponse,
                    auto_select: false,
                    cancel_on_tap_outside: true,
                    itp_support: true,
                    context: 'signin',
                    ux_mode: 'popup'
                });

                window.google.accounts.id.renderButton(
                    document.getElementById('googleButton'),
                    { 
                        theme: 'filled_blue',
                        size: 'large',
                        text: "signin_with",
                        shape: "rectangular",
                        width: 250
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
        navigate(ROUTES.CLIENTS);
    };

    return (
        <div className="container">
            <h1>Gym Tracker</h1>
            <div id="googleButton" className="form-container"></div>
        </div>
    );
}