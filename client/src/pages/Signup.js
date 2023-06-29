import React, { useState } from "react";
import { signup } from "../utils/api";
import Auth from "../utils/auth";

function SignUp() {
    const [inputState, setInputState] = useState({
        username: "",
        password: "",
    });
    async function handleFormSubmit(e) {
        e.preventDefault();
        const data = await signup(inputState);
        Auth.login(data);
    }

    function handleChange(e) {
        const { value, name } = e.target;
        setInputState({ ...inputState, [name]: value });
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
                <button type="submit">Signup</button>
            </form>
        </>
    );
}

export default SignUp;
