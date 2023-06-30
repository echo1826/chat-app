import React, { useEffect } from "react";
import "./messages.css";
import Auth from "../utils/auth";

function Messages({ socket, messages, setMessages }) {
    // const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        console.log("receiving message");
        console.log(messages);
        socket.on("receive_message", (message) => {
            console.log(message);
            setMessages([...messages, message]);
        });
    });

    const user = Auth.getProfile();
    console.log(user.data._id);

    return (
        <>
            {messages.map((message, index) => (
                <div
                    className={`${
                        message.user._id === user.data._id ? "sent" : "message"
                    }`}
                    key={index}
                >
                    {message.user.username}: {message.text}
                </div>
            ))}
        </>
    );
}

export default Messages;
