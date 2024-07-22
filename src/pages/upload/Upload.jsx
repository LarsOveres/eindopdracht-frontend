import "./Upload.css"
import InputField from "../../components/inputfield/InputField.jsx";
import Button from "../../components/button/Button.jsx";

function Upload() {
    return (
        <>
            <div className="upload-container default-box-settings shadow">

                <h1>Upload demo</h1>

                <p className="pink-line">_______________________</p>

                <InputField placeholder="Titel"
                />

                <InputField placeholder="Artiest"
                />

                <div>
                    <p>upload blok</p>
                </div>

                <InputField placeholder="Notitie"
                />

                <Button
                    text="Verstuur"
                    className="pink"
                    />

            </div>
        </>
    )
}

export default Upload