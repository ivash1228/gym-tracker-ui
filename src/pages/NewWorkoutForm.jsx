import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import { API_ENDPOINTS, BUTTON_VARIANTS, ROUTES } from '../constants/constants';
import { useApi } from '../hooks/useApi';
import '../styles/common.css';

export default function NewWorkoutForm() {
    const navigate = useNavigate();
    const { clientId } = useParams();
    const { loading, apiCall } = useApi();
    
    const [formData, setFormData] = useState({
        workoutName: '',
        workoutDate: new Date().toISOString().split('T')[0]
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.workoutName.trim()) {
            newErrors.workoutName = 'Workout name is required';
        }
        if (!formData.workoutDate.trim()) {
            newErrors.workoutDate = 'Date is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                await apiCall('post', API_ENDPOINTS.WORKOUTS(clientId), formData);
                toast.success('Workout created successfully');
                navigate(ROUTES.WORKOUTS(clientId));
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
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
            <h1>New Workout</h1>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <input
                    type="text"
                    name="workoutName"
                    value={formData.workoutName}
                    onChange={handleChange}
                    placeholder="Workout Name"
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                {errors.workoutName && <div className="error-message">{errors.workoutName}</div>}
    
                <input
                    type="date"
                    name="workoutDate"
                    value={formData.workoutDate}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
                />
                {errors.workoutDate && <div className="error-message">{errors.workoutDate}</div>}
    
                <div className="form-buttons">
                    <Button 
                        type="submit"
                        variant={BUTTON_VARIANTS.PRIMARY}
                    >
                        Save Workout
                    </Button>
                    <Button 
                        type="button" 
                        variant={BUTTON_VARIANTS.SECONDARY}
                        onClick={() => navigate(ROUTES.WORKOUTS(clientId))}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}