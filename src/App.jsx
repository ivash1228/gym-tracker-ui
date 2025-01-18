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

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/clients/new" element={<NewClient />} />
        <Route path="/clients/:clientId/workouts/:workoutId" element={<WorkoutDetails />} />
        <Route path="/clients/:clientId/workouts/new" element={<NewWorkoutForm />} />
        <Route path="/clients/:clientId/workouts" element={<Workouts />} />
        <Route path="/clients" element={
          <ProtectedRoute>
            <Clients />
          </ProtectedRoute>
        } />
        <Route path="/exercises/new" element={<NewExercise />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </Layout>
  );
}

export default App;