import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'

import ProtectedPage from './pages/ProtectedPage'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import ForbiddenPage from './pages/ForbiddenPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <ToastContainer />
        <Routes>
        <Route path="/" element={
                <ProtectedRoute allowedRoles={['user','admin']}>
                    <Dashboard /> 
                </ProtectedRoute>
            } />
            <Route 
                    path="/admin-dashboard" 
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } 
                />
            <Route path="/login" element={<Login />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />

           
        </Routes>
    </Router>
);
}

export default App
