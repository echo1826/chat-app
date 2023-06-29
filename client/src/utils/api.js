async function getMessages(token) {
    try {
        return await fetch("/api/message", {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        });
    } catch (err) {
        return "Error in getting messages";
    }
}

async function sendMessage(data, token) {
    try {
        await fetch("/api/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
    } catch (err) {
        return "Error in sending message";
    }
}

async function signup(data) {
    try {
        const response = await fetch("/api/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const token = await response.json();
        return token;
    } catch (err) {
        return err;
    }
}

async function login(data) {
    try {
        const response = await fetch("/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const token = await response.json();
        return token;
    } catch (err) {
        return err;
    }
}

export { getMessages, sendMessage, signup, login };
