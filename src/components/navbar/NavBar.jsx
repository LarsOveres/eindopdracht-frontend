import {Link, useNavigate} from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    return (
        <nav>
            <div className="nav-container">
                <ul className="nav-list">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Bibliotheek">Bibliotheek</Link></li>
                    {/*<li><Link to="/Profiel">Profiel</Link></li>*/}
                    <li><Link to="/Upload"><p className="upload">Upload</p></Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;