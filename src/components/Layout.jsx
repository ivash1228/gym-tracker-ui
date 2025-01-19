import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../constants/constants';
import Button from './Button';
import { BUTTON_VARIANTS } from '../constants/constants';

const Layout = ({ children, hideNavigation }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isClientsPage = location.pathname === ROUTES.CLIENTS;

    const handleLogout = () => {
        localStorage.removeItem('idToken');
        navigate(ROUTES.LOGIN);
    };

    return (
        <div>
            <div className="navigation-buttons" style={{
                padding: '10px',
                marginBottom: '20px',
                borderBottom: '5px solid #cdbfbf',
                minHeight: '45px'
            }}>
                {hideNavigation && isClientsPage ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Button 
                            onClick={() => console.log('Edit Clients')}
                            variant={BUTTON_VARIANTS.SECONDARY}
                        >
                            Edit Clients
                        </Button>
                        <Button
                            onClick={handleLogout}
                            variant={BUTTON_VARIANTS.PRIMARY}
                        >
                            Logout
                        </Button>
                    </div>
                ) : !hideNavigation && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Button 
                            onClick={() => navigate(-1)}
                            variant={BUTTON_VARIANTS.SECONDARY}
                        >
                            Back
                        </Button>
                        <Button
                            onClick={() => navigate(ROUTES.HOME)}
                            variant={BUTTON_VARIANTS.SECONDARY}
                        >
                            Home
                        </Button>
                    </div>
                )}
            </div>
            {children}
        </div>
    );
};

export default Layout;