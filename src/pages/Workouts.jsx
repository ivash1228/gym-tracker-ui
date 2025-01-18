import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function Workouts() {
    const navigate = useNavigate();
    const { clientId } = useParams();
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        fetchWorkouts();
    }, [clientId]);

    const fetchWorkouts = async () => {
        try {
            const response = await api.get(`/clients/${clientId}/workouts`);
            setWorkouts(response.data);
        } catch (error) {
            console.error('Error fetching workouts:', error);
        }
    };

    const handleAddWorkout = () => {
        navigate(`/clients/${clientId}/workouts/new`);
    };

    const handleWorkoutClick = (workoutId) => {
        navigate(`/clients/${clientId}/workouts/${workoutId}`);
    };

    return (
        <div className="container">
            <h1>Workouts</h1>
            {workouts.map((workout) => (
                <Button
                    key={workout.id}
                    onClick={() => handleWorkoutClick(workout.id)}
                    variant="primary"
                    fullWidth
                >
                    {workout.workoutName} - {workout.workoutDate}
                </Button>
            ))}
            <Button 
                onClick={handleAddWorkout} 
                variant="success" 
                fullWidth
            >
                Add New Workout
            </Button>
        </div>
    );
}