import React, { useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import sergeApi from '../../apiConfig';

export default function NewTrip(props) {

    const [trip, setTrip] = useState({
        name: "",
        start_date: ""
    })

    const handleChange = (event) => {
        console.log("Handling trip input change.", event);
        setTrip({
          ...trip,
          [event.target.name]: event.target.value,
        });
    };
    
    const handleSubmit = (event) => {
        console.log("Trip form submitted.");
        axios
          .post(
            `${sergeApi}/trips`,
            {
              trip: {
                name: trip.name,
                start_date: trip.start_date,
                user_id: props.userId
              },
            },
            { withCredentials: true }
          )
          .then((response) => {
            console.log("Trip created response -", response);
          })
          .catch((error) => {
            console.log("Trip not created -", error);
          });
      };

    return (
        <form onSubmit={handleSubmit} className={props.class}>
            <input
            type="name"
            name="name"
            placeholder="Name"
            value={trip.username}
            onChange={handleChange}
            required
            ></input>
            <input
            type="start_date"
            name="start_date"
            placeholder="YYYY-MM-DD"
            value={trip.start_date}
            onChange={handleChange}
            required
            ></input>
            <div className="New-Trip-Buttons">
                <button type="submit">Add</button>
                <button onClick={() => {props.handleCancel()}}>Cancel</button>
            </div>
      </form>
    )
}
