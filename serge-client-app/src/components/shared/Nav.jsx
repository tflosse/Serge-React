import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Layout.css";

export default function Nav(props) {
  const [nav, setNav] = useState("hidden");

  const handleToggle = () => {
    if (nav === "hidden") {
        setNav("shown")
    } else setNav("hidden")
  };

  const handleChoice = (event) => {
    setNav("hidden")
  }
  

  return (
    <>
        <header className="Nav-Header">
        <Link to="/dashboard" className="Logo-Container">
            {/* Can replace logo image once Moontime font is available */}
            {/* <h1 className="Brand">serge,</h1> */}
            <img id="nav-logo" src="https://i.imgur.com/R5t1teZ.png" alt="rectangular-logo" />
        </Link>
        <div onClick={handleToggle}>
            <span className="material-icons" id="Mobile-Menu">
                {nav === "hidden" ? "menu" : "close"}
            </span>
        </div>
        </header>
        <div className={nav}>
            <Link to='/dashboard' onClick={handleChoice}>
                Trips
            </Link>
            <Link to="/about"  onClick={handleChoice}>
                About
            </Link>
            <Link  to="/settings" onClick={handleChoice}>
                Account Settings
            </Link>
            <Link to="/login"  onClick={handleChoice}>
                <button id="logout" onClick={() => {props.handleLogout()}}>Log out</button>
            </Link>
        </div>
    </>
  );
}
