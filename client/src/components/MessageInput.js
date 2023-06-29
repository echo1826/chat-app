import React, { useState } from "react";
import Auth from "../utils/auth";
import { sendMessage } from "../utils/api";

function MessageInput({ socket, setMessages, messages }) {
    const [input, setInput] = useState("");
    const [messageTimeout, setMessageTimeout] = useState(false);
    const profile = Auth.getProfile();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            setMessages([
                ...messages,
                {
                    message: input,
                    user: profile._id,
                    username: profile.username,
                },
            ]);
            socket.emit("send_message", {
                message: input,
                user: profile._id,
                username: profile.username,
            });
            await sendMessage({ message: input });
            setInput("");
            setMessageTimeout(true);
            setTimeout(() => setMessageTimeout(false), 2000);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                />
                {messageTimeout ? (
                    <div>
                        Please wait 2 seconds before sending another message
                    </div>
                ) : (
                    <button type="submit">Send</button>
                )}
            </form>
        </>
    );
}

export default MessageInput;
