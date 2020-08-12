import React, { useState } from "react";
import axios from "axios";

export default function Registration(props) {
     
  const [registration, setRegistration] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    registrationErrors: "",
  });

  const handleSubmit = (event) => {
    console.log("Registration form submitted.");
    axios
      .post(
        "http://localhost:3000/registrations",
        {
          user: {
            username: registration.username,
            email: registration.email,
            password: registration.password,
            password_confirmation: registration.password_confirmation,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
          if (response.data.status === 'created') {
            props.handleSuccessfulAuth(response.data);
          }
        console.log("Registration response -", response);
      })
      .catch((error) => {
        console.log("Registration error -", error);
      });
    event.preventDefault();
  };

  const handleChange = (event) => {
    console.log("Handling registration input change.", event);
    setRegistration({
      ...registration,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <h3>Sign up</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          name="username"
          placeholder="Name"
          value={registration.username}
          onChange={handleChange}
          required
        ></input>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={registration.email}
          onChange={handleChange}
          required
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={registration.password}
          onChange={handleChange}
          required
        ></input>
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          value={registration.password_confirmation}
          onChange={handleChange}
          required
        ></input>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
