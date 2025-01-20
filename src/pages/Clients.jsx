import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import { API_ENDPOINTS, BUTTON_VARIANTS, ROUTES } from '../constants/constants';
import { useApi } from '../hooks/useApi';
import AddClientModal from '../components/client/AddClientModal';

export default function Clients() {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();
    const { loading, apiCall } = useApi();
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const data = await apiCall('get', API_ENDPOINTS.CLIENTS);
            setClients(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClientClick = (clientId) => {
        navigate(ROUTES.WORKOUTS(clientId));
    };

    const handleAddClient = async (formData) => {
        try {
            await apiCall('post', API_ENDPOINTS.CLIENTS, formData);
            setShowAddModal(false);
            fetchClients();
            toast.success('Client created successfully');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Clients</h1>
            {clients.length === 0 ? (
                <div style={{ 
                    textAlign: 'center', 
                    color: '#888',
                    margin: '20px 0'
                }}>
                    No clients yet. Add your first client!
                </div>
            ) : (
                clients.map((client) => (
                    <Button
                        key={client.id}
                        onClick={() => handleClientClick(client.id)}
                        variant={BUTTON_VARIANTS.SUCCESS}
                        fullWidth
                    >
                        {`${client.firstName} ${client.lastName}`}
                    </Button>
                ))
            )}
            <Button 
                onClick={() => setShowAddModal(true)}
                variant={BUTTON_VARIANTS.ACTION}
                fullWidth
                className="add-new-button"
            >
                Add New Client
            </Button>

            <AddClientModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onAdd={handleAddClient}
            />
        </div>
    );
}