import React from 'react';
import Registration from './Registration';
import Login from './Login';
import './Home.css';

export default function Home(props) {

    // const [signUp, setSignUp] = useState("shown");
    // const [signIn, setSignIn] = useState("hidden");

    // const showReg = () => {
    //     setSignUp("hidden")
    //     setSignIn("shown")
    // }

    // const showLog = () => {
    //     setSignUp("shown")
    //     setSignIn("hidden")
    // }

    const handleSuccessfulAuth = (data) => {
        // Update parent component
        props.handleLogin(data);
        props.history.push("/dashboard");
    };

    console.log("Status: ", props.loggedInStatus);
    
    return (
        <div className="Home-Page">
            <h1>Welcome</h1>
            <div className="Toggle-Container">
                {/* <h3>
                    <span onClick={showReg}>Sign up</span>
                    <span onClick={showLog}>Sign in</span>
                </h3> */}
            </div>
            <Registration 
            // class={signUp} 
            handleSuccessfulAuth={handleSuccessfulAuth} />
            <Login 
            // class={signIn} 
            handleSuccessfulAuth={handleSuccessfulAuth} />
            {/* <button id="logout" onClick={() => {props.handleLogout()}}>Log out</button> */}
        </div>
    )
};
