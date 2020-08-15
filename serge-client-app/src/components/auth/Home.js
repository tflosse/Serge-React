import React from 'react';
import Registration from './Registration';
import Login from './Login';
import './Home.css';

export default function Home(props) {

    const handleSuccessfulAuth = (data) => {
        // Update parent component
        props.handleLogin(data);
        props.history.push("/dashboard");
    };

    console.log("Status: ", props.loggedInStatus);
    
    return (
        <div className="Home-Page">
            <h1>Welcome</h1>
            <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
            <Login handleSuccessfulAuth={handleSuccessfulAuth} />
            <button onClick={() => {props.handleLogout()}}>Log out</button>
        </div>
    )
};
