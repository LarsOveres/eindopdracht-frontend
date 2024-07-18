import './App.css'
import {Routes, Route, Link} from "react-router-dom";
import HomePage from "./pages/homepage/HomePage.jsx";

function App() {

    return (

            <div className="main-container">

                <nav>

                    <div className="nav-container">


                        <ul className="nav-list">
                            <li><Link to="/">Home</Link></li>
                        </ul>

                    </div>

                </nav>

                <Routes>

                    <Route path="/" element={<HomePage/>}/>

                </Routes>

            </div>

    )
}

export default App
