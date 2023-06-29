// import logo from './logo.svg';
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Chat from "./pages/Chat";
// import Messages from "./components/Messages";
// import MessageInput from "./components/MessageInput";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Auth from "./utils/auth";

function App() {

    return (
        <>
            <header className="app-header">
                <h1>React Chat</h1>
            </header>

            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route
                        path="/chat"
                        element={
                            Auth.loggedIn() ? (
                                <Chat />
                            ) : (
                                <Login />
                            )
                        }
                    />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
