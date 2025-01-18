import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Clients() {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await api.get('/clients');
            setClients(response.data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    const handleClientClick = (clientId) => {
        navigate(`/clients/${clientId}/workouts`);
    };

    const handleAddClient = () => {
        navigate('/clients/new');
    };

    return (
        <div className="container">
            <h1>Clients</h1>
            {clients.map((client) => (
                <Button
                    key={client.id}
                    onClick={() => handleClientClick(client.id)}
                    variant="primary"
                    fullWidth
                >
                    {`${client.firstName} ${client.lastName}`}
                </Button>
            ))}
            <Button onClick={handleAddClient} variant="success" fullWidth>
                Add New Client
            </Button>
        </div>
    );
}