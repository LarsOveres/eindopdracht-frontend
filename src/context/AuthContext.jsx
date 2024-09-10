// // import {createContext, useEffect, useState} from "react";
// // import {useNavigate} from "react-router-dom";
// // import axios from "axios";
// // import {jwtDecode} from "jwt-decode";
// //
// // export const AuthContext = createContext({});
// //
// // function AuthContextProvider({children}) {
// //     const [auth, setAuth] = useState({
// //         isAuth: false,
// //         user: null,
// //     });
// //     const navigate = useNavigate();
// //
// //     useEffect(() => {
// //         // Controleer of er een token in localStorage is bij het laden van de pagina
// //         const token = localStorage.getItem("token");
// //         if (token) {
// //             const decodedToken = jwtDecode(token);
// //             axios.get(`http://localhost:8080/users/${decodedToken.sub}`, {
// //                 headers: {
// //                     "Authorization": `Bearer ${token}`,
// //                     "Content-Type": "application/json",
// //                 },
// //                 withCredentials: true
// //             }).then(response => {
// //                 setAuth({
// //                     isAuth: true,
// //                     user: {
// //                         email: response.data.email,
// //                         id: response.data.id,
// //                         artistName: response.data.artistName,
// //                     }
// //                 });
// //             }).catch(() => {
// //                 setAuth({
// //                     isAuth: false,
// //                     user: null,
// //                 });
// //             });
// //         }
// //     }, []);
// //
// //     async function login(token) {
// //         localStorage.setItem("token", token);
// //
// //         const decodedToken = jwtDecode(token);
// //         console.log('Token:', token);
// //         console.log('Decoded Token:', decodedToken);
// //
// //         try {
// //             const response = await axios.get(`http://localhost:8080/users/${decodedToken.sub}`, {
// //                 headers: {
// //                     "Authorization": `Bearer ${token}`,
// //                     "Content-Type": "application/json",
// //                 },
// //                 withCredentials: true
// //             });
// //
// //             setAuth({
// //                 isAuth: true,
// //                 user: {
// //                     email: response.data.email,
// //                     id: response.data.id,
// //                     artistName: response.data.artistName,
// //                 }
// //             });
// //             // navigate("/Upload");
// //
// //         } catch (e) {
// //             console.error("Login fout:", e);
// //             setAuth({
// //                 isAuth: false,
// //                 user: null,
// //             });
// //         }
// //     }
// //
// //     // const [registerResponse, setRegisterResponse] = useState(null)
// //
// //     async function register(email, artistName, password) {
// //         console.log("Ingevoerde gegevens register:", { email, artistName, password });
// //
// //         if (!password || password.trim() === "") {
// //             console.error("Wachtwoord mag niet leeg zijn");
// //             return false;
// //         }
// //         try {
// //             // Registreer de gebruiker met een POST request
// //             const registerResponse = await axios.post("http://localhost:8080/register", {
// //                 email,
// //                 artistName,
// //                 password,
// //             }, {
// //                 headers: {
// //                     "Content-Type": "application/json",
// //                 }
// //             });
// //
// //             if (registerResponse.status === 201) {
// //                 console.log("Registratie succesvol backend:", registerResponse.data);
// //
// //                 // Log de gebruiker in direct na registratie met een POST request
// //                 const loginResponse = await axios.post("http://localhost:8080/login", {
// //                     email,
// //                     password
// //                 }, {
// //                     headers: {
// //                         "Content-Type": "application/json",
// //                     }
// //                 });
// //
// //                 if (loginResponse.status === 200) {
// //                     console.log("Inloggen succesvol:", loginResponse.data);
// //                     // Roep de bestaande login functie aan met het ontvangen token
// //                     await login(loginResponse.data.token);
// //                     return true; // Succesvolle registratie en inloggen
// //                 } else {
// //                     console.error("Inloggen mislukt met status:", loginResponse.status);
// //                     console.error("Response data:", loginResponse.data);
// //                     return false; // Mislukt inloggen
// //                 }
// //             } else {
// //                 console.error("Registratie mislukt met status:", registerResponse.status);
// //                 console.error("Response data:", registerResponse.data);
// //                 return false; // Mislukte registratie
// //             }
// //         } catch (error) {
// //             console.error("Fout tijdens registratie of inloggen:", error.response ? error.response.data : error.message);
// //             if (error.response) {
// //                 console.error("Error Response Data:", error.response.data);
// //                 console.error("Error Response Status:", error.response.status);
// //                 console.error("Error Response Headers:", error.response.headers);
// //             }
// //             return false; // Mislukte registratie of inloggen
// //         }
// //     }
// //
// //     function logout() {
// //         console.log("User is logged out");
// //         setAuth({
// //             isAuth: false,
// //             user: null,
// //         });
// //         navigate("/login");
// //         localStorage.removeItem("token");
// //     }
// //
// //     const contextData = {
// //         isAuth: auth.isAuth,
// //         user: auth.user,
// //         // token: auth.token,
// //         // token: jwtDecode(token.sub),
// //         login: login,
// //         register: register,
// //         logout: logout,
// //     };
// //
// //     return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
// // }
// //
// // export default AuthContextProvider;
//
// import {createContext, useEffect, useState} from "react";
// import {useLocation, useNavigate} from "react-router-dom";
// import axios from "axios";
// import {jwtDecode} from "jwt-decode";  // blijft binnen accolades
//
// export const AuthContext = createContext({});
//
// function AuthContextProvider({children}) {
//     const [auth, setAuth] = useState({
//         isAuth: false,
//         user: null,
//         isLoading: true,
//     });
//     const navigate = useNavigate();
//     const location = useLocation();
//
//     useEffect(() => {
//         // Controleer of er een token in localStorage is bij het laden van de pagina
//         const token = localStorage.getItem("token");
//         if (token) {
//             try {
//                 const decodedToken = jwtDecode(token);
//                 const currentTime = Date.now() / 1000;
//                 if (decodedToken.exp < currentTime) {
//                     logout();  // Token verlopen, log uit
//                 } else {
//                     // Token is geldig, haal gebruikersgegevens op
//                     axios.get(`http://localhost:8080/users/${decodedToken.sub}`, {
//                         headers: {
//                             "Authorization": `Bearer ${token}`,
//                             "Content-Type": "application/json",
//                         },
//                         withCredentials: true
//                     }).then(response => {
//                         setAuth({
//                             isAuth: true,
//                             user: {
//                                 email: response.data.email,
//                                 id: response.data.id,
//                                 artistName: response.data.artistName,
//                             },
//                             isLoading: false,
//                         });
//                     }).catch(() => {
//                         setAuth({
//                             isAuth: false,
//                             user: null,
//                             isLoading: false,
//                         });
//                         logout();
//                     });
//                 }
//             } catch (error) {
//                 console.error("Fout bij token decoderen:", error);
//                 setAuth({
//                     isAuth: false,
//                     user: null,
//                     isLoading: false,
//                 });
//             }
//         } else {
//             setAuth({
//                 isAuth: false,
//                 user: null,
//                 isLoading: false,
//             });
//         }
//     }, []);
//
//     async function login(token) {
//         localStorage.setItem("token", token);
//
//         const decodedToken = jwtDecode(token);
//         console.log('Token:', token);
//         console.log('Decoded Token:', decodedToken);
//
//         try {
//             const response = await axios.get(`http://localhost:8080/users/${decodedToken.sub}`, {
//                 headers: {
//                     "Authorization": `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 },
//                 withCredentials: true
//             });
//
//             setAuth({
//                 isAuth: true,
//                 user: {
//                     email: response.data.email,
//                     id: response.data.id,
//                     artistName: response.data.artistName,
//                 }
//             });
//
//             const redirectPath = location.state?.from?.pathname || "/";
//             navigate(redirectPath);
//
//         } catch (e) {
//             console.error("Login fout:", e);
//             setAuth({
//                 isAuth: false,
//                 user: null,
//             });
//         }
//     }
//
//     async function register(email, artistName, password) {
//         console.log("Ingevoerde gegevens register:", { email, artistName, password });
//
//         if (!password || password.trim() === "") {
//             console.error("Wachtwoord mag niet leeg zijn");
//             return false;
//         }
//         try {
//             const registerResponse = await axios.post("http://localhost:8080/register", {
//                 email,
//                 artistName,
//                 password,
//             }, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 }
//             });
//
//             if (registerResponse.status === 201) {
//                 console.log("Registratie succesvol backend:", registerResponse.data);
//
//                 const loginResponse = await axios.post("http://localhost:8080/login", {
//                     email,
//                     password
//                 }, {
//                     headers: {
//                         "Content-Type": "application/json",
//                     }
//                 });
//
//                 if (loginResponse.status === 200) {
//                     console.log("Inloggen succesvol:", loginResponse.data);
//                     await login(loginResponse.data.token);
//                     return true;
//                 } else {
//                     console.error("Inloggen mislukt met status:", loginResponse.status);
//                     return false;
//                 }
//             } else {
//                 console.error("Registratie mislukt met status:", registerResponse.status);
//                 return false;
//             }
//         } catch (error) {
//             console.error("Fout tijdens registratie of inloggen:", error.response ? error.response.data : error.message);
//             return false;
//         }
//     }
//
//     function logout() {
//         console.log("User is logged out");
//         setAuth({
//             isAuth: false,
//             user: null,
//         });
//         localStorage.removeItem("token");
//         navigate("/login");
//     }
//
//     const contextData = {
//         isAuth: auth.isAuth,
//         user: auth.user,
//         login: login,
//         register: register,
//         logout: logout,
//         isLoading: false,
//     };
//
//     return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
// }
//
// export default AuthContextProvider;

// AuthContext.jsx
// import { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {jwtDecode} from "jwt-decode";
//
// export const AuthContext = createContext({});
//
// function AuthContextProvider({ children }) {
//     const [auth, setAuth] = useState({
//         isAuth: false,
//         user: null,
//     });
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();
//
//     const validateToken = () => {
//         const token = localStorage.getItem("token");
//
//         if (token) {
//             const decodedToken = jwtDecode(token);
//             const currentTime = Date.now() / 1000;
//
//             if (decodedToken.exp < currentTime) {
//                 logout();
//             } else {
//                 axios.get(`http://localhost:8080/users/${decodedToken.sub}`, {
//                     headers: {
//                         "Authorization": `Bearer ${token}`,
//                         "Content-Type": "application/json",
//                     },
//                     withCredentials: true,
//                 })
//                     .then(response => {
//                         setAuth({
//                             isAuth: true,
//                             user: {
//                                 email: response.data.email,
//                                 id: response.data.id,
//                                 artistName: response.data.artistName,
//                             },
//                         });
//                     })
//                     .catch(() => {
//                         logout();
//                     });
//             }
//         } else {
//             setAuth({
//                 isAuth: false,
//                 user: null,
//             });
//         }
//
//         setLoading(false);
//     };
//
//     useEffect(() => {
//         validateToken();
//     }, []);
//
//     function login(token) {
//         localStorage.setItem("token", token);
//         validateToken();
//     }
//
//     function logout() {
//         setAuth({
//             isAuth: false,
//             user: null,
//         });
//         localStorage.removeItem("token");
//         navigate("/login");
//     }
//
//     const contextData = {
//         isAuth: auth.isAuth,
//         user: auth.user,
//         login,
//         logout,
//         validateToken,
//     };
//
//     return (
//         <AuthContext.Provider value={contextData}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// }
//
// export default AuthContextProvider;

import {createContext, useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        isLoading: true, // Voegt een loading state toe om te voorkomen dat de routes te snel laden
    });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Controleer of er een token in localStorage is bij het laden van de pagina
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                console.log("Dit is de decoded token: ", decodedToken);

                // Controleer of de token is verlopen
                if (decodedToken.exp < currentTime) {
                    logout();
                } else {
                    // Token is nog steeds geldig, haal de gebruikersgegevens op
                    axios.get(`http://localhost:8080/users/${decodedToken.sub}`, {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }).then(response => {
                        setAuth({
                            isAuth: true,
                            user: {
                                email: response.data.email,
                                id: response.data.id,
                                artistName: response.data.artistName,
                            },
                            isLoading: false, // Zet isLoading op false na het ophalen van de gegevens
                        });
                    }).catch(() => {
                        setAuth({
                            isAuth: false,
                            user: null,
                            isLoading: false,
                        });
                        logout();
                    });
                }
            } catch (error) {
                console.error("Fout bij token decoding:", error);
                setAuth({
                    isAuth: false,
                    user: null,
                    isLoading: false,
                });
            }
        } else {
            setAuth({
                isAuth: false,
                user: null,
                isLoading: false,
            });
        }
    }, []);
    async function login(token) {
        localStorage.setItem("token", token);

        const decodedToken = jwtDecode(token);

        try {
            const response = await axios.get(`http://localhost:8080/users/${decodedToken.sub}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            console.log("API response data:", response.data);
            setAuth({
                isAuth: true,
                user: {
                    email: response.data.email,
                    id: response.data.id,
                    artistName: response.data.artistName,
                },
                isLoading: false,
            });

            const redirectPath = location.state?.from?.pathname || "/";
            navigate(redirectPath);
        } catch (e) {
            console.error("Login fout:", e);
            setAuth({
                isAuth: false,
                user: null,
                isLoading: false,
            });
        }
    }

    async function register(email, artistName, password) {
        console.log("Ingevoerde gegevens register:", {email, artistName, password});

        if (!password || password.trim() === "") {
            console.error("Wachtwoord mag niet leeg zijn");
            return false;
        }
        try {
            const registerResponse = await axios.post("http://localhost:8080/register", {
                email,
                artistName,
                password,
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (registerResponse.status === 201) {
                console.log("Registratie succesvol backend:", registerResponse.data);

                const loginResponse = await axios.post("http://localhost:8080/login", {
                    email,
                    password
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (loginResponse.status === 200) {
                    console.log("Inloggen succesvol:", loginResponse.data);
                    await login(loginResponse.data.token);
                    return true;
                } else {
                    console.error("Inloggen mislukt met status:", loginResponse.status);
                    return false;
                }
            } else {
                console.error("Registratie mislukt met status:", registerResponse.status);
                return false;
            }
        } catch (error) {
            console.error("Fout tijdens registratie of inloggen:", error.response ? error.response.data : error.message);
            return false;
        }
    }

    function logout() {
        setAuth({
            isAuth: false,
            user: null,
        });
        localStorage.removeItem("token");
        navigate("/login");
    }

    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        register: register,
        login: login,
        logout: logout,
        isLoading: auth.isLoading,
    };

    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
