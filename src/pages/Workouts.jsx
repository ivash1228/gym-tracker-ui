import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import AddWorkoutModal from '../components/workout/AddWorkoutModal';
import { API_ENDPOINTS, BUTTON_VARIANTS, ROUTES } from '../constants/constants';
import { useApi } from '../hooks/useApi';

export default function Workouts() {
    const navigate = useNavigate();
    const { clientId } = useParams();
    const [workouts, setWorkouts] = useState([]);
    const { loading, apiCall } = useApi();
    const [showAddModal, setShowAddModal] = useState(false);

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

    const handleAddWorkout = async (formData) => {
        try {
            await apiCall('post', API_ENDPOINTS.WORKOUTS(clientId), formData);
            setShowAddModal(false);
            fetchWorkouts();
            toast.success('Workout created successfully');
        } catch (error) {
            console.error('Error:', error);
        }
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
                        variant={BUTTON_VARIANTS.SUCCESS}
                        fullWidth
                    >
                        {workout.workoutName} - {workout.workoutDate}
                    </Button>
                ))
            )}
            <Button 
                onClick={() => setShowAddModal(true)}
                variant={BUTTON_VARIANTS.ACTION}
                fullWidth
                className="add-new-button"
            >
                Add New Workout
            </Button>

            <AddWorkoutModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onAdd={handleAddWorkout}
            />
        </div>
    );
}