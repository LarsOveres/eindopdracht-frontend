import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
    });
    const navigate = useNavigate();

    async function login(token) {
        localStorage.setItem("token", token);

        const decodedToken = jwtDecode(token);
        console.log('Token:', token);
        console.log('Decoded Token:', decodedToken);

        try {
            const response = await axios.get(`http://localhost:8080/users/${decodedToken.sub}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });

            setAuth({
                isAuth: true,
                user: {
                    email: response.data.email,
                    id: response.data.id,
                }
            });
            navigate("/");

        } catch (e) {
            console.error("Login fout:", e);
            setAuth({
                isAuth: false,
                user: null,
            });
        }
    }
    async function register(email, artistName, password) {
        console.log("Ingevoerde gegevens register:", { email, artistName, password });

        if (!password || password.trim() === "") {
            console.error("Wachtwoord mag niet leeg zijn");
            return false;
        }
        try {
            // Registreer de gebruiker met een POST request
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

                // Log de gebruiker in direct na registratie met een POST request
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
                    // Roep de bestaande login functie aan met het ontvangen token
                    await login(loginResponse.data.token);
                    return true; // Succesvolle registratie en inloggen
                } else {
                    console.error("Inloggen mislukt met status:", loginResponse.status);
                    console.error("Response data:", loginResponse.data);
                    return false; // Mislukt inloggen
                }
            } else {
                console.error("Registratie mislukt met status:", registerResponse.status);
                console.error("Response data:", registerResponse.data);
                return false; // Mislukte registratie
            }
        } catch (error) {
            console.error("Fout tijdens registratie of inloggen:", error.response ? error.response.data : error.message);
            if (error.response) {
                console.error("Error Response Data:", error.response.data);
                console.error("Error Response Status:", error.response.status);
                console.error("Error Response Headers:", error.response.headers);
            }
            return false; // Mislukte registratie of inloggen
        }
    }



    // async function register(email, artistName, password) {
    //     try {
    //         const response = await axios.post("http://localhost:8080/register", {
    //             email,
    //             artistName,
    //             password,
    //         }, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //             }
    //         });
    //         if (response.status === 201) {
    //             console.log("Registratie succesvol:", response.data);
    //             setAuth({
    //                 isAuth: true,
    //                 user: {
    //                     email: response.data.email,
    //                     id: response.data.id,
    //                 }
    //             });
    //             navigate("/");
    //             return true; // Succesvolle registratie
    //             // Optioneel: Automatisch inloggen na registratie
    //             // login(response.data.token);
    //         } else {
    //             console.error("Registratie mislukt");
    //             return false; // Mislukte registratie
    //         }
    //     } catch (error) {
    //         console.error("Registratie fout:", error);
    //         return false; // Mislukte registratie
    //     }
    // }

    // async function register(email, artistName, password) {
    //     console.log("Ingevoerde gegevens register:", { email, artistName, password });
    //
    //     if (!password || password.trim() === "") {
    //         console.error("Wachtwoord mag niet leeg zijn");
    //         return false;
    //     }
    //     try {
    //         // Registreer de gebruiker
    //         const registerResponse = await axios.post("http://localhost:8080/register", {
    //             email,
    //             artistName,
    //             password,
    //         }, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //             }
    //         });
    //
    //         if (registerResponse.status === 201) {
    //             console.log("Registratie succesvol backend:", registerResponse.data);
    //
    //             // Log de gebruiker in direct na registratie
    //             const loginResponse = await axios.post("http://localhost:8080/login", {
    //                 email,
    //                 password
    //             }, {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 }
    //             });
    //
    //             if (loginResponse.status === 200) {
    //                 console.log("Inloggen succesvol:", loginResponse.data);
    //                 setAuth({
    //                     isAuth: true,
    //                     user: {
    //                         email: loginResponse.data.email,
    //                         token: loginResponse.data.token, // Bewaar token
    //                     }
    //                 });
    //                 navigate("/"); // Navigeren naar de gewenste pagina na inloggen
    //                 return true; // Succesvolle registratie en inloggen
    //             } else {
    //                 console.error("Inloggen mislukt met status:", loginResponse.status);
    //                 console.error("Response data:", loginResponse.data);
    //                 return false; // Mislukte inloggen
    //             }
    //         } else {
    //             console.error("Registratie mislukt met status:", registerResponse.status);
    //             console.error("Response data:", registerResponse.data);
    //             return false; // Mislukte registratie
    //         }
    //     } catch (error) {
    //         console.error("Fout tijdens registratie of inloggen:", error.response ? error.response.data : error.message);
    //         if (error.response) {
    //             console.error("Error Response Data:", error.response.data);
    //             console.error("Error Response Status:", error.response.status);
    //             console.error("Error Response Headers:", error.response.headers);
    //         }
    //         return false; // Mislukte registratie of inloggen
    //     }
    // }




    function logout() {
        console.log("User is logged out");
        setAuth({
            isAuth: false,
            user: null,
        });
        navigate("/login");
        localStorage.removeItem("token");
    }

    const contextData = {
        isAuth: auth.isAuth,
        login: login,
        register: register,
        logout: logout,
    };

    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;