import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import NewTrip from './NewTrip';
import axios from 'axios';
import './Dashboard.css';
import sergeApi from '../../apiConfig';

export default function Dashboard(props) {

    const [tripList, setTripList] = useState([]);
    const [formClass, setFormClass] = useState("hidden")
    const [buttonClass, setButtonClass] = useState("")

    const handleToggle = () => {
        if (formClass === "hidden") {
            setFormClass("showForm")
            setButtonClass("hidden")
        } else {
            setFormClass("hidden")
            setButtonClass("")
        }
    };

    useEffect(() => {
        console.log("Getting trips")
        const getTrips = async () => {
            await axios
            .get(`${sergeApi}/trips`, { withCredentials: true })
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
            </div>
        )
    });

    return (
        <div className="Dashboard">
            {tripsToDisplay}
            <div className="New-Trip">
                <NewTrip class={formClass} userId={props.currentUser.id} handleCancel={handleToggle}/>
                <button className={buttonClass} onClick={handleToggle}>
                    <span className="material-icons" id="new-trip">add_circle</span>
                </button>
            </div>
        </div>
    )
};



