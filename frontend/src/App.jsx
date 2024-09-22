import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import AddPost from './pages/AddPost'; // Import your AddPost component
import ProtectedRoute from './components/ProtectedRoute';
import ForbiddenPage from './pages/ForbiddenPage';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import MyPosts from './pages/MyPosts';
import SinglePost from './pages/SinglePost';
import SimpleNav from './components/SimpleNav';

function App() {
  const [count, setCount] = useState(0);

  

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={
            <>
            
            <ProtectedRoute allowedRoles={['user', 'admin']}>

              <Dashboard />
            </ProtectedRoute>
            </>
          }
        />
        <Route 
          path="add-post" 
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
                <SimpleNav />
              <AddPost />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="my-posts" 
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
                <SimpleNav />
              <MyPosts />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/posts/:id" 
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
                <>
                <SimpleNav />
                </>
              <SinglePost />
            </ProtectedRoute>
          } 
        />
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

export default App;
