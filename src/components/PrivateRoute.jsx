import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {useContext} from "react";

function PrivateRoute({ element }) {
    const { isAuth } = useContext(AuthContext);

    return isAuth ? element : <Navigate to="/login" />;
}

export default PrivateRoute;
