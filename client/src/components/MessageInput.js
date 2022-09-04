import React, { useState } from "react";

function MessageInput({ socket, setMessages, messages }) {
    const [input, setInput] = useState("");
    const [messageTimeout, setMessageTimeout] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        setMessages([...messages, input]);
        socket.emit("send_message", { message: input });
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
