import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function TripDetails(props) {


    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        console.log("Getting reservations")
        const getReservations = async () => {
            await axios
            .get(`http://localhost:3000/trips/${props.match.params.id}`, { withCredentials: true })
            .then((response) => {
                console.log("Reservations - reponse: ", response)
                setReservations(response.data.reservations)
            })
            .catch((error) => {
                console.log(error);
            })
        };
        getReservations();
    }, []);

    const reservationsToDipslay = reservations.map(reservation => {

        const getDate = (date) => {
            let onlyDate = date.split("T")
            let shortDate = onlyDate[0].split("-")
            return (`${shortDate[1]}.${shortDate[2]}`)
        }
        return (
            <div className="Reservation-Container" key={reservation.id}>
                <h3>{reservation.nickname}</h3>
                <h4>{getDate(reservation.date_and_time)}</h4>
                <Link to="/trips/:id">
                    <button className="delete-button">
                        <span className="material-icons delete-icon">delete</span>
                    </button>
                </Link>
            </div>
        )
    });

    return (
        <div className="Trip-Details">
            {reservationsToDipslay}
            <Link to="/reservations/new">
                    <button><span className="material-icons" id="new-trip">add_circle</span></button>
            </Link>
        </div>
    )
}
