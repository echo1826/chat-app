import React from "react";

import MessageInput from "../components/MessageInput";
import Messages from "../components/Messages";

function Chat({ socket, messages, setMessages, username }) {
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
                username={username}
            />
        </div>
    );
}

export default Chat;
