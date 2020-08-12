import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import axios from 'axios';
import "./App.css";
import Home from "./components/shared/Home";
import Dashboard from "./components/routes/Dashboard";

export default function App() {
  const [currentUser, setCurrentUser] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {},
  });

  const handleLogin = (data) => {
    setCurrentUser({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={"/"}
            render={(props) => (
              <Home
                {...props}
                handleLogin={handleLogin}
                loggedInStatus={currentUser.loggedInStatus}
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
