import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import ProtectedPage from './pages/ProtectedPage'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <ToastContainer />
        <Routes>
        <Route path="/" element={
                <ProtectedRoute>
                    <Dashboard /> 
                </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
           
        </Routes>
    </Router>
);
}

export default App
