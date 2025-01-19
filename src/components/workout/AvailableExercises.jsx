import Button from '../Button';
import { BUTTON_VARIANTS, EXERCISE_TYPES } from '../../constants/constants';

// Список доступных упражнений
const AvailableExercises = ({ exercises, onSelect, onCreateNew }) => {
    return (
        <div style={{ marginTop: '20px' }}>
            <h3 style={{ textAlign: 'center' }}>Available Exercises</h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '10px',
                padding: '10px'
            }}>
                {exercises.map(exercise => (
                    <div 
                        key={exercise.id}
                        style={{
                            backgroundColor: 'var(--color-secondary)',
                            padding: '10px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                        onClick={() => onSelect(exercise.id, exercise.name)}
                    >
                        <div style={{ fontWeight: 'bold' }}>{exercise.name}</div>
                        <div style={{ 
                            fontSize: '0.8em',
                            color: 'var(--color-text-secondary)'
                        }}>
                            {exercise.type === EXERCISE_TYPES.SET ? 'Set Based' : 'Time Based'}
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px' }}>
                <Button 
                    onClick={onCreateNew}
                    variant={BUTTON_VARIANTS.ACTION}
                    fullWidth
                >
                    + Create New Exercise
                </Button>
            </div>
        </div>
    );
};

export default AvailableExercises; 