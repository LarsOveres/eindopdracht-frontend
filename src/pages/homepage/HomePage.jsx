import "./HomePage.css"
import {Link} from "react-router-dom";
import Tile from "../../components/tile/Tile.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

    function HomePage() {
        const [downloadStats, setDownloadStats] = useState({
            totalDownloads: 0,
            totalFiles: 0,
        });

        const token = localStorage.getItem("token");

        useEffect(() => {

            async function fetchDownloadStats() {
                try {
                    const response = await axios.get("http://localhost:8080/files/user-files/download-stats", {
                        headers: {
                            Authorization: `Bearer ${token}`, // Zorg ervoor dat je JWT-token wordt meegegeven
                        }
                    });
                    setDownloadStats(response.data);
                    console.log(response.data);
                } catch (error) {
                    console.error("Fout bij het ophalen van statistieken:", error);
                }
            }

            fetchDownloadStats();
        }, []);

    return (
        <>
            <Link to="/Upload" className="header default-box-settings default-flex">
                <div>
                    <h1 className="header-text">Nieuwe demo? upload hem snel!<img className="paper-plane"
                                                                                  src="../../../src/assets/paper-plane-solid.svg"
                                                                                  alt="paper plane" width="30px"
                                                                                  height="30px"/></h1>
                </div>
            </Link>
            <div className="container">
                <div className=" statistics default-box-settings">
                    <h1>Statistieken</h1>
                    <div className="statistics-wrapper">
                        <div className="circle default-flex">
                            <div className="circle-text">
                                <p><span className="listeners">{downloadStats.totalFiles}</span></p>
                                <p>uploads</p>
                            </div>
                        </div>
                        <div className="circle default-flex">
                            <div className="circle-text">
                                <p><span className="listeners">{downloadStats.totalDownloads}</span></p>
                                <p>downloads</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="options">
                    <Tile
                        path="/Bibliotheek"
                        text="Reacties"
                        className="tile-link"
                    />
                    <Tile
                        path="/Profiel"
                        text="Profiel"
                        className="tile-link"
                    />
                    <Tile
                        path="/Bibliotheek"
                        text="Naar mijn bibliotheek"
                        className="big-tile-link"
                    />
                </div>
            </div>
        </>
    )
}

export default HomePage;