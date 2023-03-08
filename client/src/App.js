// import logo from './logo.svg';
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import Chat from "./pages/Chat";
// import Messages from "./components/Messages";
// import MessageInput from "./components/MessageInput";
import Login from "./pages/Login";

function App() {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState(localStorage.getItem("user") || "");

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
                            <Login
                                username={username}
                                setUsername={setUsername}
                            />
                        }
                    />
                    <Route
                        path="/chat"
                        element={
                            socket ? (
                                <Chat
                                    socket={socket}
                                    messages={messages}
                                    setMessages={setMessages}
                                    username={username}
                                />
                            ) : (
                                <div>Not Connected</div>
                            )
                        }
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;
