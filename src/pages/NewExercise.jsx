import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import { API_ENDPOINTS, BUTTON_VARIANTS, EXERCISE_TYPES } from '../constants/constants';
import '../styles/common.css';
import { useApi } from '../hooks/useApi'

export default function NewExercise() {
    const navigate = useNavigate();
    const { loading, apiCall } = useApi();
    const [formData, setFormData] = useState({
        name: '',
        type: EXERCISE_TYPES.SET
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiCall('post', API_ENDPOINTS.EXERCISES, formData);
            toast.success('Exercise created successfully');
            navigate(-1);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px'
        }}>
            <h1>New Exercise</h1>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
                    style={{ width: '100%', padding: '8px', marginBottom: '20px', backgroundColor: 'var(--color-secondary)', color: 'var(--color-text-primary)' }}
                >
                    <option value={EXERCISE_TYPES.SET}>Set Based</option>
                    <option value={EXERCISE_TYPES.TIME}>Time Based</option>
                </select>
                <div className="form-buttons">
                    <Button 
                        type="submit"
                        variant={BUTTON_VARIANTS.ACTION}
                    >
                        Create Exercise
                    </Button>
                    <Button 
                        type="button" 
                        variant={BUTTON_VARIANTS.SECONDARY}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(-1);
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}