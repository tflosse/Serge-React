import React, { useState } from "react";
import axios from "axios";
import './Home.css';
import sergeApi from '../../apiConfig';

export default function Login(props) {
  const [session, setSession] = useState({
    username: "",
    email: "",
    password: "",
    loginErrors: "",
  });

  const handleChange = (event) => {
    console.log("Handling login input change.", event);
    setSession({
      ...session,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    console.log("Login attempted.");
    axios
      .post(
        `${sergeApi}/sessions`,
        {
          user: {
            username: session.username,
            email: session.email,
            password: session.password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.logged_in) {
          props.handleSuccessfulAuth(response.data);
        }
        console.log("Login response -", response);
      })
      .catch((error) => {
        console.log("Login error -", error);
      });
    event.preventDefault();
  };

  return (
    <div className={`Login-Container ${props.class}`}>
      <h3><em id="member">Already using Serge?</em><br />Sign In</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          name="username"
          placeholder="Name"
          value={session.username}
          onChange={handleChange}
          required
        ></input>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={session.email}
          onChange={handleChange}
          required
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={session.password}
          onChange={handleChange}
          required
        ></input>
        <button type="submit">
          <span className="material-icons">login</span>
        </button>
      </form>
    </div>
  );
}
