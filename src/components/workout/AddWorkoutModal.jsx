import { useState } from 'react';
import Button from '../Button';
import { BUTTON_VARIANTS } from '../../constants/constants';

const AddWorkoutModal = ({ isOpen, onClose, onAdd }) => {
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

    const handleSubmit = () => {
        if (validateForm()) {
            onAdd(formData);
            setFormData({
                workoutName: '',
                workoutDate: new Date().toISOString().split('T')[0]
            });
        }
    };

    if (!isOpen) return null;
    
    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -70%)',
            backgroundColor: 'var(--color-background)',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            zIndex: 1000,
            border: '1px solid var(--color-border)',
        }}>
            <h3>New Workout</h3>
            <div>
                <input
                    type="text"
                    value={formData.workoutName}
                    onChange={(e) => setFormData({ ...formData, workoutName: e.target.value })}
                    placeholder="Workout Name"
                    style={{ marginBottom: '10px' }}
                />
                {errors.workoutName && <div className="error-message">{errors.workoutName}</div>}

                <input
                    type="date"
                    value={formData.workoutDate}
                    onChange={(e) => setFormData({ ...formData, workoutDate: e.target.value })}
                />
                {errors.workoutDate && <div className="error-message">{errors.workoutDate}</div>}
            </div>
            <div className="form-buttons">
                <Button 
                    onClick={handleSubmit}
                    variant={BUTTON_VARIANTS.ACTION}
                    fullWidth
                >
                    Create Workout
                </Button>
                <Button 
                    onClick={onClose}
                    variant={BUTTON_VARIANTS.SECONDARY}
                    fullWidth
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default AddWorkoutModal; 