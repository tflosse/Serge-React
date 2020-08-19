import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";

import sergeApi from './apiConfig';
// Components
import Landing from "./components/shared/Landing";
import Home from "./components/auth/Home";
import Dashboard from "./components/routes/Dashboard";
import TripDetails from "./components/routes/TripDetails";
import Layout from "./components/shared/Layout";
// import NewReservation from "./components/routes/NewReservation";
import About from "./components/shared/About";
import Settings from "./components/shared/Settings";
import ResShare from './components/routes/ResShare';
import ResUpdate from './components/routes/ResUpdate';

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
        .get(`${sergeApi}/logged_in`, { withCredentials: true })
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
    axios.delete(`${sergeApi}/logout`, { withCredentials: true})
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
          <Layout currentUser={currentUser}>
            <Route
              exact
              path={"/dashboard"}
              render={(props) => (
                <Dashboard
                  {...props}
                  loggedInStatus={currentUser.loggedInStatus}
                  currentUser={currentUser.user}
                />
              )}
            />
            <Route
              exact
              path={"/trips/:id"}
              render={(props) => (
                <TripDetails
                  {...props}
                  loggedInStatus={currentUser.loggedInStatus}
                />
              )}
            />
            {/* <Route
              exact
              path={"/reservations/new"}
              render={(props) => (
                <NewReservation
                  {...props}
                  loggedInStatus={currentUser.loggedInStatus}
                />
              )}
            /> */}
            <Route
              exact
              path={"/reservations/:id/share"}
              component={ResShare}
            />
            <Route
              exact
              path={"/reservations/:id/update"}
              render={(props) => (
                <ResUpdate
                  {...props}
                  loggedInStatus={currentUser.loggedInStatus}
                />
              )}
            />
            <Route
              exact
              path={"/about"}
              component={About}
            />
            <Route
              exact
              path={"/settings"}
              render={(props) => (
                <Settings
                  {...props}
                  loggedInStatus={currentUser.loggedInStatus}
                />
              )}
            />
          </Layout>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
