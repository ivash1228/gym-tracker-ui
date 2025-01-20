import { useState } from 'react';
import Button from '../Button';
import { BUTTON_VARIANTS } from '../../constants/constants';

const AddClientModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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

    const handleSubmit = () => {
        if (validateForm()) {
            onAdd(formData);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: ''
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
            <h3>New Client</h3>
            <div>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                />
                {errors.firstName && <div className="error-message">{errors.firstName}</div>}

                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                />
                {errors.lastName && <div className="error-message">{errors.lastName}</div>}

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                {errors.email && <div className="error-message">{errors.email}</div>}

                <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                />
                {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
            </div>
            <div className="form-buttons">
                <Button 
                    onClick={handleSubmit}
                    variant={BUTTON_VARIANTS.ACTION}
                    fullWidth
                >
                    Create Client
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

export default AddClientModal; 