import "./Library.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function Library() {

    const [searchInput, setSearchInput] = useState("");
    const [files, setFiles] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        // Haal de bestanden op bij het laden van de component
        const fetchFiles = async () => {
            try {
                const response = await axios.get("http://localhost:8080/files/list", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Fetched Files:', response.data);
                setFiles(response.data);
            } catch (error) {
                console.error("Fout bij het ophalen van de bestanden:", error);
            }
        };

        fetchFiles();
    }, [token]);

    const handleSearch = (event) => {
        setSearchInput(event.target.value.toLowerCase());
    };

    const filteredFiles = files.filter(
        (file) =>
            file.fileName.toLowerCase().includes(searchInput) ||
            file.artistName.toLowerCase().includes(searchInput)
    );

    return (
        <div className="library-conainer shadow">

            <h1>Geüploade Bestanden</h1>

            <input
            type="text"
            placeholder="Zoek op naam of artiest..."
            value={searchInput}
            onChange={handleSearch}
            className="search-bar"
            />

            {filteredFiles.length > 0 ? (
                <ul>
                    {filteredFiles.map((file, index) => (
                        <li className="file-library" key={index}>

                            <Link to={`/files/${file.id}`}>
                                {file.fileName} - {file.artistName}
                            </Link>

                        </li>
                    ))}
                </ul>
            ) : (
                <p>Er zijn geen bestanden gevonden.</p>
            )}
        </div>
    );
}

export default Library