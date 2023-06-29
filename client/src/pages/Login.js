import React, { useState } from "react";

function Login() {
    const [inputState, setInputState] = useState({
        username: "",
        password: "",
    });
    function handleFormSubmit(e) {
        e.preventDefault();
    }

    function handleChange(e) {
        const { value, name } = e.target;
        setInputState({ ...inputState, name: value });
    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <input
                    name="username"
                    onChange={handleChange}
                    value={inputState.username}
                />
                <input
                    name="password"
                    onChange={handleChange}
                    value={inputState.password}
                    type="password"
                />
                <button type="submit">Login</button>
            </form>
        </>
    );
}

export default Login;
