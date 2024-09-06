// // components/PrivateRoute.jsx
// import { useContext } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext.jsx';
//
// function PrivateRoute({ element }) {
//     const { isAuth, isLoading } = useContext(AuthContext);
//     const location = useLocation();
//
//     if (isLoading) {
//         return <div>Loading...</div>; // Laadscherm tonen totdat tokenvalidatie is voltooid
//     }
//
//     return isAuth ? element : <Navigate to="/login" state={{ from: location }} replace />;
// }
//
// export default PrivateRoute;

// components/PrivateRoute.jsx
// import { useContext, useEffect, useState } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext.jsx';
//
// function PrivateRoute({ element }) {
//     const { isAuth, validateToken } = useContext(AuthContext);
//     const location = useLocation();
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         // Controleer de geldigheid van de token bij paginawisseling
//         validateToken();
//         setLoading(false);
//     }, [location]);
//
//     if (loading) {
//         return null; // Of een loader als je dat wilt
//     }
//
//     if (!isAuth) {
//         return <Navigate to="/login" state={{ from: location }} replace />;
//     }
//
//     return element;
// }
//
// export default PrivateRoute;

// import {useContext} from 'react';
// import {Navigate, useLocation} from 'react-router-dom';
// import {AuthContext} from '../context/AuthContext.jsx';
//
// function PrivateRoute({element}) {
//     const {isAuth} = useContext(AuthContext);
//     const location = useLocation();
//
//     // Als de gebruiker niet is ingelogd, sla de huidige locatie op
//     return isAuth ? element : <Navigate to="/login" state={{ from: location }} replace />;
// }
//
// export default PrivateRoute;

// components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

function PrivateRoute({ element }) {
    const { isAuth, isLoading } = useContext(AuthContext);
    const location = useLocation();

    if (isLoading) {
        return <div>Loading...</div>; // Laadscherm tonen totdat tokenvalidatie is voltooid
    }

    return isAuth ? element : <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute;
