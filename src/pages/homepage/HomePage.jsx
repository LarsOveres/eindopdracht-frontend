import "./HomePage.css"
import {Link} from "react-router-dom";
import Tile from "../../components/tile/Tile.jsx";

function HomePage() {
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
                                <p><span className="listeners">5</span>x</p>
                                <p>geluisterd</p>
                            </div>
                        </div>
                        <div className="circle default-flex">
                            <div className="circle-text">
                                <p><span className="listeners">2</span></p>
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

export default HomePage