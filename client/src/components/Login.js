import React from "react";

function Login(props) {
    return (
        <>
            <form>
                <input
                    name="username"
                    onChange={(event) => props.setUsername(event.value)}
                    value={props.username}
                />
                <button>Login</button>
            </form>
        </>
    );
}

export default Login;
