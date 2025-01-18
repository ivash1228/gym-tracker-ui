import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

export function useApi() {
    const [loading, setLoading] = useState(false);

    const apiCall = async (method, endpoint, data = null) => {
        setLoading(true);
        try {
            const response = await api[method](endpoint, data);
            return response.data;
        } catch (error) {
            if (Array.isArray(error.response?.data)) {
                error.response.data.forEach(err => toast.error(err));
            } else {
                toast.error('Operation failed');
            }
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        apiCall
    };
} 