import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

import MessageInput from "../components/MessageInput";
import Messages from "../components/Messages";
import { getMessages } from "../utils/api";
import Auth from "../utils/auth";

function Chat() {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // console.log("useEffect firing");
        const newSocket = io();
        setSocket(newSocket);
        // clean up function to close the connection to server
        return () => {
            newSocket.close();
        };
    }, []);

    const messageData = messages.length;

    useEffect(() => {
        async function doStuff() {
            try {
                const token = Auth.loggedIn() ? Auth.getToken() : null;
                const response = await getMessages(token);
                const data = await response.json();
                setMessages(data);
            } catch (err) {
                console.log(err);
            }
        }
        doStuff()
    }, [messageData]);

    if(!messageData) {
        return <h2>Loading...</h2>
    }

    return (

        <div className="chat-container">
            <Messages
                socket={socket}
                messages={messages}
                setMessages={setMessages}
            />
            <MessageInput
                socket={socket}
                setMessages={setMessages}
                messages={messages}
            />
        </div>
    );
}

export default Chat;
