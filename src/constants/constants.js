export const EXERCISE_TYPES = {
    SET: 'SET',
    TIME: 'TIME'
};

export const API_ENDPOINTS = {
    CLIENTS: '/clients',
    WORKOUTS: (clientId) => `/clients/${clientId}/workouts`,
    WORKOUT_DETAILS: (clientId, workoutId) => `/clients/${clientId}/workouts/${workoutId}`,
    WORKOUT_EXERCISES: (clientId, workoutId) => `/clients/${clientId}/workouts/${workoutId}/exercises`,
    WORKOUT_SETS: (clientId, workoutId, exerciseId) => `/clients/${clientId}/workouts/${workoutId}/exercises/${exerciseId}/sets`,
    EXERCISES: '/exercises'
};

export const BUTTON_VARIANTS = {
    ACTION: 'action',
    SECONDARY: 'secondary',
    SUCCESS: 'success'
};

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    CLIENTS: '/clients',
    WORKOUTS: (clientId) => `/clients/${clientId}/workouts`,
    WORKOUT_DETAILS: (clientId, workoutId) => `/clients/${clientId}/workouts/${workoutId}`,
    NEW_EXERCISE: '/exercises/new'
}; 