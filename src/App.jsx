import './App.css'
import {Routes, Route, Link} from "react-router-dom";
import HomePage from "./pages/homepage/HomePage.jsx";
import Library from "./pages/library/Library.jsx";
import ProfilePage from "./pages/profilepage/ProfilePage.jsx";

function App() {

    return (

            <div className="main-container">

                <nav>

                    <div className="nav-container">


                        <ul className="nav-list">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/Bibliotheek">Bibliotheek</Link></li>
                            <li><Link to="/Profiel">Profiel</Link></li>
                        </ul>

                    </div>

                </nav>

                <Routes>

                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/Bibliotheek" element={<Library/>}/>
                    <Route path="/Profiel" element={<ProfilePage/>}/>

                </Routes>

            </div>

    )
}

export default App
