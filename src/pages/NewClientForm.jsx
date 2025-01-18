import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import Button from '../components/Button';
import { API_ENDPOINTS, BUTTON_VARIANTS } from '../constants/constants';
import '../styles/common.css';

export default function NewClientForm() {
    const navigate = useNavigate();
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                await api.post(API_ENDPOINTS.CLIENTS, formData);
                toast.success('Client created successfully');
                navigate('/clients');
            } catch (error) {
                console.error('Error:', error);
                toast.error('Failed to create client');
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
            <h1>New Client</h1>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}
            >
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                {errors.firstName && <div className="error-message">{errors.firstName}</div>}

                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                {errors.lastName && <div className="error-message">{errors.lastName}</div>}

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}

                <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
                />
                {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}

                <div className="form-buttons">
                    <Button 
                        type="submit"
                        variant={BUTTON_VARIANTS.PRIMARY}
                    >
                        Create Client
                    </Button>
                    <Button 
                        type="button"
                        variant={BUTTON_VARIANTS.SECONDARY}
                        onClick={() => navigate(API_ENDPOINTS.CLIENTS)}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}