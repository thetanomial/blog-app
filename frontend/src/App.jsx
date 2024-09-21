import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import ProtectedPage from './pages/ProtectedPage'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
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
