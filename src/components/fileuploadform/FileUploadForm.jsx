import {useContext, useState} from 'react';
import { useDropzone } from 'react-dropzone';
import Button from "../button/Button.jsx";
import axios from "axios";
import "./FileUploadForm.css"
import {AuthContext} from "../../context/AuthContext.jsx";

const FileUploadForm = () => {
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);

    const { user } = useContext(AuthContext);


    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'audio/mpeg': ['.mp3'],
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name || !file) {
            alert('Vul alle velden in.');
            return;
        }

        if (!user || !user.id) {
            alert('Gebruikers-ID ontbreekt. Log opnieuw in.');
            console.error('User or token is missing:', user);
            return;
        }

        console.log("bestandstype", file.type);


        const formData = new FormData();
        formData.append('name', name);
        formData.append('file', file);
        formData.append('type', file.type);
        formData.append('size', file.size);
        formData.append('userId', user.id);

        const token = localStorage.getItem('token'); // Zorg dat je token is opgeslagen na login
        console.log("Gebruikers token:", token);
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        };

        console.log(config);

        try {
            const response = await axios.post('http://localhost:8080/files/upload', formData, config);

            if (response.status === 200) {
                alert('Bestand succesvol geüpload!');
            } else {
                alert('Er is een fout opgetreden bij het uploaden.');
            }
        } catch (error) {
            console.error('Upload fout:', error);
            alert('Er is een fout opgetreden.');
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <input
                type="text"
                id="name"
                value={name}
                placeholder="Titel"
                onChange={(e) => setName(e.target.value)}
                required
            />

            <div className="file-container"
                 {...getRootProps()}
            >
                <input {...getInputProps()} />
                {file ? (
                    <p>{file.name}</p>
                ) : isDragActive ? (
                    <p className="file-drop-text">Laat het bestand hier vallen...</p>
                ) : (
                    <p className="file-drop-text">Sleep en laat een MP3-bestand hier vallen, of klik om te
                        selecteren</p>
                )}
            </div>

            <Button
                text="Uploaden"
                className="pink"
                type="submit"
            />
        </form>
    );
};

export default FileUploadForm;
