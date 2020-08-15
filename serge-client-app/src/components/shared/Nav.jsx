import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Layout.css";

export default function Nav() {
  const [nav, setNav] = useState("hidden");

  const handleToggle = () => {
    if (nav === "hidden") {
        setNav("shown")
    } else setNav("hidden")
  };

  return (
    <>
        <header className="Nav-Header">
        <Link to="/dashboard" className="Logo-Container">
            {/* Can replace logo image once Moontime font is available */}
            {/* <h1 className="Brand">serge,</h1> */}
            <img src="https://i.imgur.com/R5t1teZ.png" alt="rectangular-logo" />
        </Link>
        <div onClick={handleToggle}>
            <span className="material-icons" id="Mobile-Menu">
                menu
            </span>
        </div>
        </header>
        <div className={nav}>
            <Link>
                Trips
            </Link>
            <Link>
                Reservations
            </Link>
            <Link>
                Account Settings
            </Link>
            <Link to="/login">
                Return to login
            </Link>
        </div>
    </>
  );
}
