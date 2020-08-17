import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'

export default function Dashboard(props) {

    const [tripList, getTripList] = useState([]);

    useEffect(() => {
        console.log("Getting trips")
        const getTrips = async () => {
            await axios
            .get("http://localhost:3000/trips", { withCredentials: true })
            .then((response) => {
                console.log("Get Trips - reponse: ", response)
                getTripList(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
        };
        getTrips();
    }, []);

    const tripsToDisplay = tripList.map(trip => {
        return (
            <div className="Trip-Container">
                <h3>{trip.name}</h3>
                <p>{trip.start_date}</p>
            </div>
        )
    });

    return (
        <div className="Dashboard">
            {/* {tripsToDisplay} */}
            <div className="New-Trip">
                <button><span className="material-icons">add</span></button>
            </div>
        </div>
    )
};



