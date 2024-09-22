import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const useLogout = () => {
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = (redirectPath = '/login') => {
        localStorage.removeItem('token'); // Remove token from local storage
        dispatch({ type: 'LOGOUT' });
        navigate(redirectPath);
    };

    return logout;
};

export default useLogout;
