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
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    setDownloadStats(response.data);
                } catch (error) {
                    console.error("Fout bij het ophalen van statistieken:", error);
                }
            }

            fetchDownloadStats();
        }, []);

    return (
        <>
            <Link to="/Upload" className="flexbox-home">
                <div>
                    <h1 className="header-text">Nieuwe demo? upload hem snel!<img className="paper-plane"
                                                                                  src="../../../src/assets/paper-plane-solid.svg"
                                                                                  alt="paper plane" width="30px"
                                                                                  height="30px"/></h1>
                </div>
            </Link>
            <div className="container">
                <div className="statistics">
                    <h1>Statistieken</h1>
                    <div className="statistics-wrapper">
                        <div className="circle">
                            <div className="circle-plane">
                                <p><span className="listeners">{downloadStats.totalFiles}</span></p>
                                <p>uploads</p>
                            </div>
                        </div>
                        <div className="circle default-flex">
                            <div className="circle-text">
                                <div className="circle-plane">
                                <p><span className="listeners">{downloadStats.totalDownloads}</span></p>
                                <p>downloads</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Tile
                    path="/Bibliotheek"
                    text="Bibliotheek"
                    className="tile-link"
                    />
                <Tile
                    path="/Upload"
                    text="Upload"
                    className="tile-link"
                    />
            </div>
        </>
    )
}

export default HomePage;