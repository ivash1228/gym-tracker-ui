import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import Button from '../components/Button';
import { API_ENDPOINTS, BUTTON_VARIANTS, ROUTES } from '../constants/constants';
import { useApi } from '../hooks/useApi';

export default function Workouts() {
    const navigate = useNavigate();
    const { clientId } = useParams();
    const [workouts, setWorkouts] = useState([]);
    const { loading, apiCall } = useApi();

    useEffect(() => {
        fetchWorkouts();
    }, [clientId]);

    const fetchWorkouts = async () => {
        try {
            const workouts = await apiCall('get', API_ENDPOINTS.WORKOUTS(clientId));
            setWorkouts(workouts);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddWorkout = () => {
        navigate(ROUTES.NEW_WORKOUT(clientId));
    };

    const handleWorkoutClick = (workoutId) => {
        navigate(ROUTES.WORKOUT_DETAILS(clientId, workoutId));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Workouts</h1>
            {workouts.length === 0 ? (
                <div style={{ 
                    textAlign: 'center', 
                    color: '#888',
                    margin: '20px 0'
                }}>
                    No workouts yet. Add your first workout!
                </div>
            ) : (
                workouts.map((workout) => (
                    <Button
                        key={workout.id}
                        onClick={() => handleWorkoutClick(workout.id)}
                        variant={BUTTON_VARIANTS.PRIMARY}
                        fullWidth
                    >
                        {workout.workoutName} - {workout.workoutDate}
                    </Button>
                ))
            )}
            <Button 
                onClick={handleAddWorkout} 
                variant={BUTTON_VARIANTS.SUCCESS}
                fullWidth
            >
                Add New Workout
            </Button>
        </div>
    );
}