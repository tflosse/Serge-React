import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";

// Components
import Landing from "./components/shared/Landing";
import Home from "./components/auth/Home";
import Dashboard from "./components/routes/Dashboard";

export default function App() {
// Current user state
  const [currentUser, setCurrentUser] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {},
  });

// Check user login and session status
  useEffect(() => {
    const checkLoginStatus = async () => {
      await axios
        .get("http://localhost:3000/logged_in", { withCredentials: true })
        .then((response) => {
          console.log("Logged in? ", response);
          if (
            response.data.logged_in &&
            currentUser.loggedInStatus === "NOT_LOGGED_IN"
          ) {
            setCurrentUser({
              loggedInStatus: "LOGGED_IN",
              user: response.data.user,
            });
          } else if (
            !response.data.logged_in &&
            currentUser.loggedInStatus === "NOT_LOGGED_IN"
          ) {
            setCurrentUser({
              loggedInStatus: "NOT_LOGGED_IN",
              user: {},
            });
          }
        })
        .catch((error) => {
          console.log("Check login error -", error);
        });
    };
    checkLoginStatus();
  }, []);

// User login and logout handlers
  const handleLogin = (data) => {
    console.log("Handling login.")
    setCurrentUser({
      loggedInStatus: "LOGGED_IN",
      user: data.user,
    });
  };
  const handleLogout = () => {
    console.log("Handling logout.")
    axios.delete("http://localhost:3000/logout", { withCredentials: true})
    .then(response => {
      setCurrentUser({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
      })
    }).catch(error => {
      console.log("Logout error -", error)
    })
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route 
            exact
            path={"/"}
            component={Landing}/>
          <Route
            exact
            path={"/login"}
            render={(props) => (
              <Home
                {...props}
                handleLogin={handleLogin}
                loggedInStatus={currentUser.loggedInStatus}
                handleLogout={handleLogout}
              />
            )}
          />
          <Route
            exact
            path={"/dashboard"}
            render={(props) => (
              <Dashboard
                {...props}
                loggedInStatus={currentUser.loggedInStatus}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
