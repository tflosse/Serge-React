import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TripDetails.css'

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

    const handleDestroy = async (event) => {
        await axios
            .delete(`http://localhost:3000/trips/${props.match.params.id}/reservations/${props.match.params.id}`, { withCredentials: true })
            .then((response) => {
                console.log("Destroy - reponse: ", response)
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const reservationsToDipslay = reservations.map(reservation => {

        const getDate = (date) => {
            let onlyDate = date.split("T").shift()
            let shortDate = onlyDate.split("-")
            return (`${shortDate[1]}.${shortDate[2]}`)
        }

        const getTime = (date) => {
            let onlyTime = date.split("T").pop()
            let time = onlyTime.split(".").shift().split(":")
            return (`${time[0]}:${time[1]}`)
        }

        return (
            <div className="Reservation-Container" key={reservation.id}>
                <Link to={`/reservations/${reservation.id}`}>
                    <h3>{reservation.nickname}</h3>
                    <h4>{getDate(reservation.date_and_time)} <br />
                    at {getTime(reservation.date_and_time)}</h4>
                </Link>
                <Link to="/trips/:id">
                    <button className="delete-button"
                    onClick={handleDestroy}>
                        <span className="material-icons delete-icon">delete</span>
                    </button>
                </Link>
            </div>
        )
    });

    return (
        <div className="Trip-Details">
            <Link to="/reservations/new">
                    <button><span className="material-icons" id="new-reservation">add_circle</span></button>
            </Link>
            <Link to="/trips/share">
                    <button><span className="material-icons" id="share-trip">share</span></button>
            </Link>
            {reservationsToDipslay}
            
        </div>
    )
}
