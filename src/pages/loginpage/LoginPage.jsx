import "./LoginPage.css";
import InputField from "../../components/inputfield/InputField.jsx";
import Button from "../../components/button/Button.jsx";
import {useContext, useState} from "react";
import InputFieldInverted from "../../components/inputfield_inverted/InputFieldInverted.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";

function LoginPage() {
    const {login, register } = useContext(AuthContext);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState(null);

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerArtist, setRegisterArtist] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerError, setRegisterError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log('Inloggegevens:', {loginEmail, loginPassword});
        try {
            const response = await axios.post("http://localhost:8080/login", {
                    email: loginEmail,
                    password: loginPassword,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                withCredentials: true
                }
            );

            console.log('Login response:', response); // Log de response

            if (response.status === 200 && response.data.token) {
                login(response.data.token);
            } else {
                console.error("Onjuiste inloggegevens");
                setLoginError("Onjuiste inloggegevens. Probeer het opnieuw.");
            }
        } catch (e) {
            console.error(e);
            setLoginError("Er is iets misgegaan tijdens het inloggen. Probeer het opnieuw.");
        }
    }

    async function handleRegister(e) {
        e.preventDefault();

        if (!registerEmail || !registerArtist || !registerPassword) {
            setRegisterError("Alle velden moeten ingevuld zijn.");
            return;
        }

        console.log("Ingevoerde gegevens: ", { email: registerEmail, artistName: registerArtist, password: registerPassword });

        const success = await register(registerEmail, registerArtist, registerPassword);

        if (!success) {
            setRegisterError("Registratie mislukt. Probeer het opnieuw.");
        }
    }

    return (
        <div className="flexbox shadow">
            <div className="container-heigth upload-container default-box-settings login-corners">
                <h1>Log in</h1>
                <p className="pink-line">_______________________</p>

                <form onSubmit={handleSubmit}>
                    <InputField
                        placeholder="Email"
                        value={loginEmail}
                        onChange={(e) => {
                            console.log('Email invoer:', e.target.value); // Log de nieuwe waarde
                            setLoginEmail(e.target.value);
                        }}
                    />
                    <InputField
                        placeholder="Wachtwoord"
                        type="password"
                        value={loginPassword}
                        onChange={(e) => {
                            console.log('Wachtwoord invoer:', e.target.value); // Log de nieuwe waarde
                            setLoginPassword(e.target.value);
                        }}
                    />
                    <Button
                        className="pink"
                        type="submit"
                        text="Log in"
                    />
                    {loginError && <p className="error">{loginError}</p>}
                </form>

            </div>

            <div className="container-heigth signup-container default-box-settings upload-container">
                <h1>Meld aan</h1>
                <p className="white-line">_______________________</p>

                <form onSubmit={handleRegister}>
                <InputFieldInverted
                    placeholder="Email"
                    value={registerEmail}
                    onChange={(e) => {
                        console.log('Email invoer:', e.target.value); // Log de nieuwe waarde
                        setRegisterEmail(e.target.value);
                    }}
                />
                <InputFieldInverted
                    placeholder="Artiest"
                    value={registerArtist}
                    onChange={(e) => {
                        console.log('Email invoer:', e.target.value); // Log de nieuwe waarde
                        setRegisterArtist(e.target.value);
                    }}
                />
                <InputFieldInverted
                    placeholder="Wachtwoord"
                    type="password"
                    value={registerPassword}
                    onChange={(e) => {
                        console.log('Email invoer:', e.target.value); // Log de nieuwe waarde
                        setRegisterPassword(e.target.value);
                    }}
                />
                <Button
                    text="Aanmelden"
                    className="white"
                    type="submit"
                />
                </form>
                {registerError && <p className="error">{registerError}</p>}
            </div>
        </div>
    );
}

export default LoginPage;

