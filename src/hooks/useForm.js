import { useState } from 'react';
import { toast } from 'react-toastify';

export function useForm(initialState, validationRules) {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(validationRules).forEach(field => {
            if (validationRules[field](formData[field]) !== true) {
                newErrors[field] = validationRules[field](formData[field]);
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleApiError = (error) => {
        if (Array.isArray(error.response?.data)) {
            error.response.data.forEach(err => toast.error(err));
        } else {
            toast.error('Operation failed');
        }
    };

    return {
        formData,
        errors,
        handleChange,
        validateForm,
        handleApiError,
        setFormData
    };
} 