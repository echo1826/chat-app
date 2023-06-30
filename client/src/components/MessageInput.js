import React, { useState } from "react";
import Auth from "../utils/auth";
import { sendMessage } from "../utils/api";

function MessageInput({ socket, setMessages, messages }) {
    const [input, setInput] = useState("");
    const [messageTimeout, setMessageTimeout] = useState(false);
    const profile = Auth.getProfile();

    console.log(profile);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            setMessages([
                ...messages,
                {
                    message: input,
                    user: profile.data._id,
                    username: profile.data.username,
                },
            ]);
            console.log(input, profile.data._id, profile.data.username)
            socket.emit("send_message", {
                message: input,
                user: profile.data._id,
                username: profile.data.username,
            });
            await sendMessage({ message: input, user: profile.data._id, username: profile.data.username }, Auth.getToken());
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
