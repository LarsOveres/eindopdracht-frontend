import "./ProfilePage.css"
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil} from "@fortawesome/free-solid-svg-icons";


function ProfilePage() {

    const [emailValue, setEmailValue] = useState("");

    const handleChangeEmail = (event) => {
        setEmailValue(event.target.value);
    };

    const [emailDisabled, setEmailDisabled] = useState(true);

    const changeEmailDisabled = () => {
        setEmailDisabled(!emailDisabled);
    }

    const [passwordValue, setPasswordValue] = useState("");

    const handleChangePassword = (event) => {
        setPasswordValue(event.target.value);
    };

    const [passwordDisabled, setPasswordDisabled] = useState(true);

    const changePasswordDisabled = () => {
        setPasswordDisabled(!passwordDisabled);
    }

    const [artistNameValue, setArtistNameValue] = useState("");

    const handleChangeArtistname = (event) => {
        setArtistNameValue(event.target.value);
    };

    const [artistNameDisabled, setArtistNameDisabled] = useState(true);

    const changeArtistNameDisabled = () => {
        setArtistNameDisabled(!artistNameDisabled);
    }


    return (
        <>
            <div className="profile-container default-box-settings shadow">

                <h1>Profiel</h1>

                <p className="pink-line">_______________________</p>

                <form /* onSubmit={} */ >
                    {/*<div className="input-wrapper shadow">*/}

                        <input type="text" className="user-info" value={emailValue} onChange={handleChangeEmail}
                               disabled={emailDisabled} placeholder="email"
                               autoComplete="email" /* hier komt automatisch de email te staan *//>

                        <FontAwesomeIcon className="pencil-icon" icon={faPencil} onClick={changeEmailDisabled}/>

                    {/*</div>*/}

                    {/*<div className="input-wrapper shadow">*/}

                        <input type="text" className="user-info" value={passwordValue} onChange={handleChangePassword}
                               disabled={passwordDisabled} placeholder="wachtwoord"
                               autoComplete="password" /* hier komt automatisch het wachtwoord *** te staan *//>

                        <FontAwesomeIcon className="pencil-icon" icon={faPencil} onClick={changePasswordDisabled}/>

                    {/*</div>*/}

                    {/*<div className="input-wrapper shadow">*/}

                        <input type="text" className="user-info" value={artistNameValue}
                               onChange={handleChangeArtistname}
                               disabled={artistNameDisabled} placeholder="artiestennaam"
                               autoComplete="artistName" /* hier komt automatisch de artiestennaam te staan *//>

                        <FontAwesomeIcon className="pencil-icon" icon={faPencil} onClick={changeArtistNameDisabled}/>

                    {/*</div>*/}
                </form>
            </div>
            </>
            )
            }

            export default ProfilePage