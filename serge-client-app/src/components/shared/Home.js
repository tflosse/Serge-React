import React from 'react';
import Registration from '../auth/Registration';
import Login from '../auth/Login';

export default function Home(props) {

    const handleSuccessfulAuth = (data) => {
        // Update parent component
        props.handleLogin(data);
        props.history.push("/dashboard");
    }

    return (
        <div>
            <h1>Home</h1>
            <h2>Status: {props.loggedInStatus} </h2>
            <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
            <Login handleSuccessfulAuth={handleSuccessfulAuth} />
        </div>
    )
};
