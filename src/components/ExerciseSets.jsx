export default function ExerciseSets({ sets }) {
    if (!sets || sets.length === 0) {
        return <p className="no-sets">No sets added yet</p>;
    }

    return (
        <>
            <div className="exercise-sets">
                <div>REPS</div>
                <div>WEIGHT</div>
            </div>
            {sets.map((set, index) => (
                <div key={index} className="exercise-set">
                    <div>{set.reps}</div>
                    <div>{set.weights} kg</div>
                </div>
            ))}
        </>
    );
} 