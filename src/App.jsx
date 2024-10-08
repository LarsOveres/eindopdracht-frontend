import './App.css'
import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/homepage/HomePage.jsx";
import Library from "./pages/library/Library.jsx";
import Upload from "./pages/upload/Upload.jsx";
import ErrorPage from "./pages/errorpage/ErrorPage.jsx";
import NavBar from "./components/navbar/NavBar.jsx";
import LoginPage from "./pages/loginpage/LoginPage.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import DemoPage from "./pages/demopage/DemoPage.jsx";

function App() {

    return (

        <>
            <div className="main-container">
                <AuthContextProvider>
                <NavBar/>
                    <Routes>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/" element={<PrivateRoute element={<HomePage/>}/>}/>
                        <Route path="/Bibliotheek" element={<PrivateRoute element={<Library/>}/>}/>
                        <Route path="/files/:id" element={<PrivateRoute element={<DemoPage/>}/>}/>
                        <Route path="/Upload" element={<PrivateRoute element={<Upload/>}/>}/>
                        <Route path="/*" element={<PrivateRoute element={<ErrorPage/>}/>}/>
                    </Routes>
                </AuthContextProvider>
            </div>
        </>

    );
}

export default App
