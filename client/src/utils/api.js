async function getMessages() {
    try {
        const response = await fetch("/api/message");
        const data = await response.json();
        return data;
    } catch (err) {
        return "Error in getting messages";
    }
}

async function sendMessage(data) {
    try {
        await fetch("/api/message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    } catch (err) {
        return "Error in sending message";
    }
}

async function signup(data) {
    try {
        const response = await fetch("/api/signup", {
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
        const response = await fetch("/api/login", {
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
