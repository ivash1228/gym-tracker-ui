import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import Button from '../components/Button';
import FormLayout from '../components/FormLayout';
import FormInput from '../components/FormInput';
import { useForm } from '../hooks/useForm';

const validationRules = {
    firstName: value => value.trim() ? true : 'First name is required',
    lastName: value => value.trim() ? true : 'Last name is required',
    email: value => value.trim() ? true : 'Email is required',
    phoneNumber: value => value.trim() ? true : 'Phone number is required'
};

export default function NewClient() {
    const navigate = useNavigate();
    const { formData, errors, handleChange, validateForm, handleApiError } = useForm({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    }, validationRules);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await api.post('/clients', formData);
                toast.success('Client created successfully');
                navigate('/clients');
            } catch (error) {
                handleApiError(error);
            }
        }
    };

    return (
        <FormLayout title="New Client">
            <FormInput
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                error={errors.firstName}
            />
            <FormInput
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                error={errors.lastName}
            />
            <FormInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                error={errors.email}
            />
            <FormInput
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                error={errors.phoneNumber}
            />
            <Button type="submit" variant="primary" fullWidth onClick={handleSubmit}>
                Create Client
            </Button>
            <Button 
                type="button" 
                onClick={() => navigate('/clients')} 
                variant="secondary"
                fullWidth
            >
                Cancel
            </Button>
        </FormLayout>
    );
} 