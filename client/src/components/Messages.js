import React, { useEffect } from "react";
import "./messages.css";

function Messages({ socket, messages, setMessages }) {
    // const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        console.log("receiving message");
        console.log(messages);
        socket.on('receive_message', (message) => setMessages([...messages, message]));
    })

    return (
        <>
            {messages.map((message, index) => <div className="message" key={index}>{message}</div>)}
        </>
    );
}

export default Messages;
