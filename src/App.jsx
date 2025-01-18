import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Clients from './pages/Clients';
import ProtectedRoute from './components/ProtectedRoute';
import Workouts from './pages/Workouts';
import NewClient from './pages/NewClientForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewWorkoutForm from './pages/NewWorkoutForm';
import WorkoutDetails from './pages/WorkoutDetails';
import NewExercise from './pages/NewExercise';
import Layout from './components/Layout';
import { ROUTES } from './constants/constants';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.NEW_CLIENT} element={<NewClient />} />
        <Route path={ROUTES.WORKOUT_DETAILS(':clientId', ':workoutId')} element={<WorkoutDetails />} />
        <Route path={ROUTES.NEW_WORKOUT(':clientId')} element={<NewWorkoutForm />} />
        <Route path={ROUTES.WORKOUTS(':clientId')} element={<Workouts />} />
        <Route path={ROUTES.CLIENTS} element={
          <ProtectedRoute>
            <Clients />
          </ProtectedRoute>
        } />
        <Route path={ROUTES.NEW_EXERCISE} element={<NewExercise />} />
        <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.CLIENTS} replace />} />
      </Routes>
      <ToastContainer />
    </Layout>
  );
}

export default App;