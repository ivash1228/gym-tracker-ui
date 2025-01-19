import Button from '../Button';
import { BUTTON_VARIANTS } from '../../constants/constants';

// Компонент для отображения одного упражнения с сетами
const ExerciseCard = ({ exerciseName, exerciseData, onAddSet }) => {
    return (
        <div style={{
            margin: '10px 0',
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '8px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ margin: '0' }}>{exerciseName}</h3>
                <Button
                    onClick={() => onAddSet(exerciseData.workoutExerciseId)}
                    variant={BUTTON_VARIANTS.ACTION}
                >
                    + Add Set
                </Button>
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
    );
};

export default ExerciseCard; 