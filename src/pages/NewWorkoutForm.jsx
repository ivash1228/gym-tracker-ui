import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import Button from '../components/Button';
import '../styles/common.css';

export default function NewWorkoutForm() {
    const navigate = useNavigate();
    const { clientId } = useParams();
    
    const [formData, setFormData] = useState({
        workoutName: '',
        workoutDate: ''
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
                const response = await api.post(`/clients/${clientId}/workouts`, formData);
                if (response.status === 200 || response.status === 201) {
                    toast.success('Workout created successfully');
                    navigate(`/clients/${clientId}/workouts`);
                }
            } catch (error) {
                if (Array.isArray(error.response?.data)) {
                    error.response.data.forEach(errorMessage => {
                        toast.error(errorMessage);
                    });
                } else {
                    toast.error('Failed to create workout');
                }
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

    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px'
        }}>
            <h1>New Workout</h1>
            <form onSubmit={handleSubmit} style={{ width: '300px' }}>
                <input
                    type="text"
                    name="workoutName"
                    value={formData.workoutName}
                    onChange={handleChange}
                    placeholder="Workout Name"
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                <input
                    type="date"
                    name="workoutDate"
                    value={formData.workoutDate}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                <Button type="submit">Save Workout</Button>
                <Button 
                    type="button" 
                    onClick={() => navigate(`/clients/${clientId}/workouts`)}
                >
                    Cancel
                </Button>
            </form>
        </div>
    );
}