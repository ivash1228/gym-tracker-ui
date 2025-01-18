import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/constants';

const Layout = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div>
            <div style={{
                padding: '10px',
                marginBottom: '20px',
                borderBottom: '5px solid #cdbfbf',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <button
                    onClick={() => navigate(ROUTES.HOME)}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#AE3030',
                        color: '#cdbfbf',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Home
                </button>
            </div>
            {children}
        </div>
    );
};

export default Layout;