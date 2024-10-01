import "./Upload.css"
import FileUploadForm from "../../components/fileuploadform/FileUploadForm.jsx";

function Upload() {

    return (
        <>
            <div className="flexbox-upload">
                <h1>Upload een MP3-bestand</h1>
                <FileUploadForm/>
            </div>
        </>
    )
}

export default Upload