import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

function PrivateRoute({ element }) {
    const { isAuth, isLoading } = useContext(AuthContext);
    const location = useLocation();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isAuth ? element : <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute;
