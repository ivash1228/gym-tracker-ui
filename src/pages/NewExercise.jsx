import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import Button from '../components/Button';
import '../styles/common.css';

export default function NewExercise() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        type: 'SET'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/exercises', formData);
            toast.success('Exercise created successfully');
            navigate(-1);
        } catch (error) {
            if (Array.isArray(error.response?.data)) {
                error.response.data.forEach(err => toast.error(err));
            } else {
                toast.error('Failed to create exercise');
            }
        }
    };

    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px'
        }}>
            <h1>New Exercise</h1>
            <form onSubmit={handleSubmit} style={{ width: '300px' }}>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Exercise Name"
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                >
                    <option value="SET">Set Based</option>
                    <option value="TIME">Time Based</option>
                </select>
                <Button type="submit">Create Exercise</Button>
                <Button type="button" onClick={() => navigate(-1)}>Cancel</Button>
            </form>
        </div>
    );
}