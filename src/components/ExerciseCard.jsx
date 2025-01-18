export default function ExerciseCard({ exercise, onClick }) {
    return (
        <div 
            className="exercise-card"
            onClick={() => onClick(exercise.id, exercise.name)}
        >
            <div className="exercise-name">{exercise.name}</div>
            <div className="exercise-type">
                {exercise.type === 'SET' ? 'Set Based' : 'Time Based'}
            </div>
        </div>
    );
} 