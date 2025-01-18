import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import Button from '../components/Button';
import { API_ENDPOINTS, BUTTON_VARIANTS, ROUTES, EXERCISE_TYPES } from '../constants/constants';
import '../styles/common.css';

export default function WorkoutDetails() {
    const { clientId, workoutId } = useParams();
    const navigate = useNavigate();

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
            const workoutResponse = await api.get(API_ENDPOINTS.WORKOUT_DETAILS(clientId, workoutId));
            setWorkout(workoutResponse.data);
            setExercisesWithSets(workoutResponse.data.orderedExercisesWithSets);
            const exercisesResponse = await api.get(API_ENDPOINTS.EXERCISES);
            setAllExercises(exercisesResponse.data);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to fetch workout details');
        }
    };

    const handleExerciseSelect = async (exerciseId, exerciseName) => {
        try {
            const response = await api.post(API_ENDPOINTS.WORKOUT_EXERCISES(clientId, workoutId), {
                exerciseId: exerciseId
            });
            const workoutExerciseId = response.data;
            console.log('Workout Exercise ID:', workoutExerciseId);

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
            toast.error('Failed to add exercise');
        }
    };

    const handleAddSet = async () => {
        try {
            await api.post(API_ENDPOINTS.WORKOUT_SETS(clientId, workoutId, workoutExerciseId), {
                weights: parseInt(newSet.weights),
                reps: parseInt(newSet.reps)
            });
            setShowAddSetModal(false);
            setNewSet({ weights: '', reps: '' });
            fetchWorkoutDetails();
            toast.success('Set added successfully');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to add set');
        }
    };

    if (!workout) return <div>Loading...</div>;

    return (
        <div style={{
            padding: '20px',
            maxWidth: '800px'
        }}>
            <h1>{workout.workoutName}</h1>
            <h2>{workout.workoutDate}</h2>

            <div>
                {Object.entries(exercisesWithSets || {}).map(([exerciseName, exerciseData]) => (
                    <div key={exerciseName} style={{
                        margin: '10px 0',
                        padding: '15px',
                        border: '1px solid #ccc',
                        borderRadius: '8px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <h3 style={{ margin: '0' }}>{exerciseName}</h3>
                            <button
                                onClick={() => {
                                    const selectedWorkoutExerciseId = exerciseData.workoutExerciseId;
                                    if (selectedWorkoutExerciseId) {
                                        setWorkoutExerciseId(selectedWorkoutExerciseId);
                                        setShowAddSetModal(true);
                                    } else {
                                        toast.error('Cannot add set: Exercise ID not found');
                                    }
                                }}
                                style={{
                                    padding: '4px 8px',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                + Set
                            </button>
                        </div>

                        {/* Заголовки колонок */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '10px',
                            marginBottom: '8px',
                            color: '#888'
                        }}>
                            <div>REPS</div>
                            <div>WEIGHT</div>
                        </div>
                        {/* Сеты */}
                        {(!exerciseData.sets || exerciseData.sets.length === 0) ? (
                            <p style={{ color: '#888', margin: 0 }}>No sets added yet</p>
                        ) : (
                            exerciseData.sets.map((set, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '10px',
                                        padding: '8px 0',
                                        borderBottom: '1px solid #333'
                                    }}
                                >
                                    <div>{set.reps}</div>
                                    <div>{set.weights} kg</div>
                                </div>
                            ))
                        )}
                    </div>
                ))}
            </div>

                    {/* Список всех доступных упражнений */}
        <div style={{ marginTop: '20px' }}>
            <h3>Available Exercises</h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '10px',
                padding: '10px'
            }}>
                {allExercises.map(exercise => (
                    <div 
                        key={exercise.id}
                        style={{
                            backgroundColor: '#2d2d2d',
                            padding: '10px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleExerciseSelect(exercise.id, exercise.name)}
                    >
                        <div style={{ fontWeight: 'bold' }}>{exercise.name}</div>
                        <div style={{ 
                            fontSize: '0.8em',
                            color: '#888'
                        }}>
                            {exercise.type === EXERCISE_TYPES.SET ? 'Set Based' : 'Time Based'}
                        </div>
                    </div>
                ))}
            </div>
        </div>

            <div style={{ marginTop: '20px' }}>
                <Button onClick={() => navigate(ROUTES.NEW_EXERCISE)}>
                    + Create New Exercise
                </Button>
            </div>

            {showExerciseList && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    maxHeight: '80vh',
                    overflow: 'auto'
                }}>
                    <h3>Select Exercise</h3>
                    {allExercises.map(exercise => (
                        <Button
                            key={exercise.id}
                            onClick={() => handleExerciseSelect(exercise.id, exercise.name)}
                        >
                            {exercise.name}
                        </Button>
                    ))}
                    <Button onClick={() => navigate(ROUTES.NEW_EXERCISE)}>
                        + Create New Exercise
                    </Button>
                    <Button onClick={() => setShowExerciseList(false)}>
                        Cancel
                    </Button>
                </div>
            )}

            {showAddSetModal && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    zIndex: 1000
                }}>
                    <h3>Add New Set</h3>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="number"
                            placeholder="Weight (kg)"
                            value={newSet.weights}
                            onChange={(e) => setNewSet({ ...newSet, weights: e.target.value })}
                            style={{ marginRight: '10px' }}
                        />
                        <input
                            type="number"
                            placeholder="Reps"
                            value={newSet.reps}
                            onChange={(e) => setNewSet({ ...newSet, reps: e.target.value })}
                        />
                    </div>
                    <div>
                        <Button onClick={() => handleAddSet()}>Add</Button>
                        <Button onClick={() => {
                            setShowAddSetModal(false);
                            setNewSet({ weights: '', reps: '' });
                        }}>Cancel</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
