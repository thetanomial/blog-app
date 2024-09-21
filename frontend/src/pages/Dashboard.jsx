import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {

    const navigate = useNavigate()

    const {dispatch} = useContext(AuthContext)

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
    };
  return (
    <>
    <div>Dashboard</div>
    <button onClick={handleLogout}>Log out</button>
    </>
  )
}



export default Dashboard