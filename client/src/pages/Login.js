import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../utils/api";
import Auth from "../utils/auth";

function Login() {
    const [inputState, setInputState] = useState({
        username: "",
        password: "",
    });
    async function handleFormSubmit(e) {
        e.preventDefault();
        const data = await login(inputState);
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
                <button type="submit">Login</button>
            </form>
            <Link to={"/signup"}>Signup instead</Link>
        </>
    );
}

export default Login;
