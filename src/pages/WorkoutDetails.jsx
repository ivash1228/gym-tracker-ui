import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_ENDPOINTS, BUTTON_VARIANTS, ROUTES, EXERCISE_TYPES } from '../constants/constants';
import { useApi } from '../hooks/useApi';
import '../styles/common.css';
import ExerciseCard from '../components/workout/ExerciseCard';
import AddSetModal from '../components/workout/AddSetModal';
import AvailableExercises from '../components/workout/AvailableExercises';
import EmptyWorkoutMessage from '../components/workout/EmptyWorkoutMessage';

export default function WorkoutDetails() {
    const { clientId, workoutId } = useParams();
    const navigate = useNavigate();
    const { loading, apiCall } = useApi();

    const [workout, setWorkout] = useState(null);
    const [exercisesWithSets, setExercisesWithSets] = useState({});
    const [showExerciseList, setShowExerciseList] = useState(false);
    const [showAddSetModal, setShowAddSetModal] = useState(false);
    const [workoutExerciseId, setWorkoutExerciseId] = useState(null);
    const [newSet, setNewSet] = useState({ weights: '', reps: '' });
    const [allExercises, setAllExercises] = useState([]);

    useEffect(() => {
        fetchWorkoutDetails();
    }, [workoutId, clientId]);

    const fetchWorkoutDetails = async () => {
        try {
            const workoutResponse = await apiCall('get', API_ENDPOINTS.WORKOUT_DETAILS(clientId, workoutId));
            setWorkout(workoutResponse);
            setExercisesWithSets(workoutResponse.orderedExercisesWithSets);
            const exercisesResponse = await apiCall('get', API_ENDPOINTS.EXERCISES);
            setAllExercises(exercisesResponse);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleExerciseSelect = async (exerciseId, exerciseName) => {
        try {
            const response = await apiCall('post', API_ENDPOINTS.WORKOUT_EXERCISES(clientId, workoutId), {
                exerciseId: exerciseId
            });
            const workoutExerciseId = response;

            setExercisesWithSets(prev => ({
                ...prev,
                [exerciseName]: {
                    workoutExerciseId: workoutExerciseId,
                    sets: []
                }
            }));

            setShowExerciseList(false);
            fetchWorkoutDetails();
            toast.success('Exercise added successfully');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddSet = async () => {
        try {
            await apiCall('post', API_ENDPOINTS.WORKOUT_SETS(clientId, workoutId, workoutExerciseId), {
                weights: parseInt(newSet.weights),
                reps: parseInt(newSet.reps)
            });
            setShowAddSetModal(false);
            setNewSet({ weights: '', reps: '' });
            fetchWorkoutDetails();
            toast.success('Set added successfully');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!workout) return <div>Loading...</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px' }}>
            <h1>{workout.workoutName}</h1>
            <h2>{workout.workoutDate}</h2>

            {Object.keys(exercisesWithSets || {}).length === 0 ? (
                <EmptyWorkoutMessage />
            ) : (
                <div>
                    {Object.entries(exercisesWithSets || {}).map(([exerciseName, exerciseData]) => (
                        <ExerciseCard
                            key={exerciseName}
                            exerciseName={exerciseName}
                            exerciseData={exerciseData}
                            onAddSet={(workoutExerciseId) => {
                                setWorkoutExerciseId(workoutExerciseId);
                                setShowAddSetModal(true);
                            }}
                        />
                    ))}
                </div>
            )}

            <AvailableExercises
                exercises={allExercises}
                onSelect={handleExerciseSelect}
                onCreateNew={() => navigate(ROUTES.NEW_EXERCISE)}
            />

            <AddSetModal
                isOpen={showAddSetModal}
                onClose={() => setShowAddSetModal(false)}
                onAdd={handleAddSet}
                newSet={newSet}
                setNewSet={setNewSet}
            />
        </div>
    );
}
