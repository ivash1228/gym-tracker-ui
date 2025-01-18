export const EXERCISE_TYPES = {
    SET: 'SET',
    TIME: 'TIME'
};

export const API_ENDPOINTS = {
    EXERCISES: '/exercises',
    CLIENTS: '/clients',
    WORKOUTS: (clientId) => `/clients/${clientId}/workouts`,
    WORKOUT_DETAILS: (clientId, workoutId) => `/clients/${clientId}/workouts/${workoutId}`,
    WORKOUT_EXERCISES: (clientId, workoutId) => `/clients/${clientId}/workouts/${workoutId}/exercises`,
    WORKOUT_SETS: (clientId, workoutId, exerciseId) => 
        `/clients/${clientId}/workouts/${workoutId}/exercises/${exerciseId}/sets`
};

export const BUTTON_VARIANTS = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    SUCCESS: 'success'
}; 