import "./ProfilePage.css"
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import Button from "../../components/button/Button.jsx";


function ProfilePage() {

    const {isAuth, user, token} = useContext(AuthContext);
    console.log("isAuth is: " + isAuth);
    console.log("user is: ", user);
    console.log("token info: ", token);


    // useEffect(() => {
    //     if (registerResponse) {
    //         setArtistNameValue(registerResponse.artistName || "");
    //         setEmailValue(registerResponse.email || "");
    //     } else if (user) {
    //         setArtistNameValue(user.artistName || "");
    //         setEmailValue(user.email || "");
    //     }
    // }, [registerResponse, user]);


    const [artistNameValue, setArtistNameValue] = useState("");
    // const [artistNameDisabled, setArtistNameDisabled] = useState(true);

    const [emailValue, setEmailValue] = useState("");
    // const [emailDisabled, setEmailDisabled] = useState(true);

    // const [passwordValue, setPasswordValue] = useState("");
    // const [passwordDisabled, setPasswordDisabled] = useState(true);

    useEffect(() => {
        if (isAuth && user) {

        }
    }, [isAuth, user]);

    const handleChangeArtistname = (event) => {
        setArtistNameValue(event.target.value);
    };

    // const changeArtistNameDisabled = () => {
    //     setArtistNameDisabled(!artistNameDisabled);
    // }


    const handleChangeEmail = (event) => {
        setEmailValue(event.target.value);
    };

    // const changeEmailDisabled = () => {
    //     setEmailDisabled(!emailDisabled);
    // }

    // const handleChangePassword = (event) => {
    //     setPasswordValue(event.target.value);
    // };

    // const changePasswordDisabled = () => {
    //     setPasswordDisabled(!passwordDisabled);
    // }


    return (
        <>
            <div className="profile-container default-box-settings shadow">

                <h1>Profiel</h1>

                <p className="pink-line">_______________________</p>

                <form /* onSubmit={} */ >

                    <div className="input-wrapper shadow">

                        <input
                            type="text"
                            className="user-info"
                            // value={}
                            onChange={handleChangeArtistname}
                            // disabled={artistNameDisabled}
                            placeholder="artiestennaam"
                            autoComplete="artistName"
                        />

                        {/*<FontAwesomeIcon className="pencil-icon" icon={faPencil} onClick={changeArtistNameDisabled}/>*/}

                    </div>

                    <div className="input-wrapper shadow">

                        <input type="text"
                               className="user-info"
                               // value={}
                               onChange={handleChangeEmail}
                               // disabled={emailDisabled}
                               placeholder="email"
                               autoComplete="email"
                        />

                        {/*<FontAwesomeIcon className="pencil-icon" icon={faPencil} onClick={changeEmailDisabled}/>*/}

                    </div>

                    {/*<div className="input-wrapper shadow">*/}

                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        className="user-info"*/}
                    {/*        value={passwordValue}*/}
                    {/*        onChange={handleChangePassword}*/}
                    {/*        disabled={passwordDisabled}*/}
                    {/*        placeholder="wachtwoord"*/}
                    {/*        autoComplete="password"*/}
                    {/*    />*/}

                    {/*    <FontAwesomeIcon className="pencil-icon" icon={faPencil} onClick={changePasswordDisabled}/>*/}

                    {/*</div>*/}
                    <Button
                        type="button"
                        // onClick={changeArtistNameDisabled || changeEmailDisabled}
                        text="hoi"
                    />
                </form>
            </div>
        </>
    )
}

export default ProfilePage