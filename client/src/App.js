// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Messages from "./components/Messages";
import MessageInput from "./components/MessageInput";

function App() {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

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
