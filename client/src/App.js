// import logo from './logo.svg';
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import Chat from "./pages/Chat";
// import Messages from "./components/Messages";
// import MessageInput from "./components/MessageInput";
import Login from "./pages/Login";
import Auth from './utils/auth';

function App() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // console.log("useEffect firing");
        const newSocket = io();
        setSocket(newSocket);
        // clean up function to close the connection to server
        return () => {
            newSocket.close();
        };
    }, []);

    console.log(socket);

    return (
        <>
            <header className="app-header">
                <h1>React Chat</h1>
            </header>

            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Login/>
                        }
                    />
                    <Route
                        path="/chat"
                        element={
                            socket && Auth.isLoggedIn() ? (
                                <Chat
                                    socket={socket}
                                />
                            ) : (
                                <Login />
                            )
                        }
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;
