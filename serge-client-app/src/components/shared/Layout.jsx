import React, { useState } from 'react';
import axios from 'axios';
import Nav from './Nav';
import Footer from './Footer';
import './Layout.css'
import sergeApi from '../../apiConfig';


export default function Layout(props) {

    const [currentUser, setCurrentUser] = useState(
        props.currentUser);

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
        console.log(currentUser)
      };

    return (
        <div className="Layout">  
            <Nav handleLogout={handleLogout} />
            <div className="Main-Container">
                {props.children}
            </div>
            <Footer />
        </div>
    )
}
