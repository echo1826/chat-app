// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import {Routes, Route, Link} from "react-router-dom";
import { io } from "socket.io-client";
import Messages from "./components/Messages";
import MessageInput from "./components/MessageInput";
import Login from "./components/Login";

function App() {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        console.log("useEffect firing");
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
            <header className='app-header'>
                <h1>React Chat</h1>
            </header>

            <Login username={username} setUsername={setUsername}/>

            {socket ? (
                <div className="chat-container">
                    <Messages socket={socket} messages={messages} setMessages={setMessages}/>
                    <MessageInput socket={socket} setMessages={setMessages} messages={messages}/>
                </div>
            ) : (
                <div>Not Connected</div>
            )}
        </>
    );
}

export default App;
