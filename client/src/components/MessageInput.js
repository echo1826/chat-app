import React, { useState } from "react";

function MessageInput({ socket, setMessages, messages, username }) {
    const [input, setInput] = useState("");
    const [messageTimeout, setMessageTimeout] = useState(false);
    console.log(username);

    function handleSubmit(event) {
        event.preventDefault();
        setMessages([...messages, { message: input, sender: socket.id }]);
        socket.emit("send_message", { message: input, sender: socket.id });
        setInput("");
        setMessageTimeout(true);
        setTimeout(() => setMessageTimeout(false), 2000);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                />
                {messageTimeout ? <></> : <button type="submit">Send</button>}
            </form>
        </>
    );
}

export default MessageInput;
