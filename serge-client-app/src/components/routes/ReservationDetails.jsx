import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ReservationDetails.css'

export default function ReservationDetails() {

    const [reservation, setReservation] = useState({});

    useEffect(() => {
        console.log("Getting reservation details")
        const getReservation = async () => {
            await axios
            .get(`http://localhost:3000/reservations/${props.match.params.id}`, { withCredentials: true })
            .then((response) => {
                console.log("Details - reponse: ", response)
                setReservation(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
        };
        getReservation();
    }, []);

    console/log(reservation)

    return (
        <div>
            
        </div>
    )
}
