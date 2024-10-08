import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import { useLocation } from "react-router-dom";
import {useContext} from "react";
import "./NavBar.css"

function Navbar() {

    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const navbarHeight = "84px";

    if (location.pathname === "/login") {
        return <div style={{ height: navbarHeight }}></div>;
    }

    return (
        <nav>
            <div>
                <ul className="nav-list">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Bibliotheek">Bibliotheek</Link></li>
                    <li><Link to="/Upload"><p className="upload">Upload</p></Link></li>
                    <li><Link onClick={handleLogout}>Logout</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;