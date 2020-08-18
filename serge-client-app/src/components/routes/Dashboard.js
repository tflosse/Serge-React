import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import NewTrip from './NewTrip';
import axios from 'axios';
import './Dashboard.css'

export default function Dashboard(props) {

    const [tripList, setTripList] = useState([]);
    const [formClass, setFormClass] = useState("hidden")
    const [buttonClass, setButtonClass] = useState("shown")

    console.log("currentUser -", props.currentUser)
    console.log("currentUserId -", props.currentUser.id)

    const handleToggle = () => {
        if (formClass === "hidden") {
            setFormClass("shown")
            setButtonClass("hidden")
        } else {
            setFormClass("hidden")
            setButtonClass("shown")
        }
    };

    useEffect(() => {
        console.log("Getting trips")
        const getTrips = async () => {
            await axios
            .get("http://localhost:3000/trips", { withCredentials: true })
            .then((response) => {
                console.log("Trips - reponse: ", response)
                setTripList(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
        };
        getTrips();
    }, []);

    const tripsToDisplay = tripList.map(trip => {

        const getDate = (date) => {
            let shortDate = date.split("-")
            return (`${shortDate[1]}.${shortDate[2]}`)
        }
        return (
            <div className="Trip-Container" key={trip.id}>
                <Link to={`/trips/${trip.id}`}>
                    <h3>{trip.name}</h3>
                    <h4>{getDate(trip.start_date)}</h4>
                </Link>
                {/* <button className="delete-button">
                    <span className="material-icons delete-icon">delete</span>
                </button> */}
            </div>
        )
    });

    return (
        <div className="Dashboard">
            {tripsToDisplay}
            <div className="New-Trip">
                <NewTrip className={formClass} userId={props.currentUser.id} />
                <button className={buttonClass} onClick={handleToggle}>
                    <span className="material-icons" id="new-trip">add_circle</span>
                    </button>
            </div>
        </div>
    )
};



