import React from "react";


function Login(props) {
    function handleFormSubmit(e) {
        e.preventDefault();
        localStorage.setItem("user", JSON.stringify(props.username));
        document.location.replace("/chat");
    }

    function handleChange(e) {
        const { value } = e.target;
        props.setUsername(value);
    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <input
                    name="username"
                    onChange={handleChange}
                    value={props.username}
                />
                <button type="submit">Login</button>
            </form>
        </>
    );
}

export default Login;
