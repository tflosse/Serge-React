import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./TripDetails.css";
import sergeApi from "../../apiConfig";

export default function TripDetails(props) {
  const [reservations, setReservations] = useState([]);
  const [trip, setTrip] = useState({
    id: null,
    name: "",
    start_date: "",
  });

  const getDate = (date) => {
    let onlyDate = date.split("T").shift();
    let shortDate = onlyDate.split("-");
    return `${shortDate[1]}.${shortDate[2]}`;
  };

  const getTime = (date) => {
    let onlyTime = date.split("T").pop();
    let time = onlyTime.split(".").shift().split(":");
    return `${time[0]}:${time[1]}`;
  };

  useEffect(() => {
    console.log("Getting reservations");
    const getDetails = async () => {
      await axios
        .get(`${sergeApi}/trips/${props.match.params.id}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log("Reservations - reponse: ", response);
          setTrip({
            id: response.data.id,
            name: response.data.name,
            start_date: response.data.start_date,
          });
          setReservations(response.data.reservations);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getDetails();
  }, []);

  const handleDeleteTrip = async (event) => {
    await axios
      .delete(`${sergeApi}/trips/${trip.id}`, { withCredentials: true })
      .then((response) => {
        console.log("Destroy - reponse: ", response);
      })
      .catch((error) => {
        console.log(error);
      });
    props.history.push("/dashboard");
  };

  const [updateInput, setUpdateInput] = useState("hide-field");

  const toggleInput = () => {
    if (updateInput === "hide-field") {
      setUpdateInput("show-field");
    } else setUpdateInput("hide-field");
  };

  const handleNameChange = (event) => {
    setTrip({
      ...trip,
      [event.target.name]: event.target.value,
    });
  };

  const handleNameUpdate = async (event) => {
    await axios
      .put(
        `${sergeApi}/trips/${trip.id}`,
        {
          trip: {
            ...trip,
            name: trip.name,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Update- reponse: ", response);
      })
      .catch((error) => {
        console.log(error);
      });
      setUpdateInput("hide-field")
  };

  const handleDeleteResa = async (event) => {
    await axios
      .delete(
        `${sergeApi}/reservations/${props.match.params.id}/reservations/${props.match.params.id}`,
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Destroy - reponse: ", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reservationsToDisplay = reservations.map((reservation) => {
    return (
      <div
        className="Reservation-Container"
        id={`${reservation.reservation_type}`}
        key={reservation.id}
      >
        <h3>{reservation.nickname}</h3>
        <h4>
          {getDate(reservation.date_and_time)} <br />
          at {getTime(reservation.date_and_time)}
        </h4>
        <p>
          <em>{reservation.location}</em>
        </p>
        <p>{reservation.details}</p>
        <p>$ {reservation.cost}</p>
        <p>{reservation.is_paid ? "Paid" : " "}</p>
        <div className="reservation-buttons">
          <Link to={`/reservations/${reservation.id}/update`}>
            <button>
              <span className="material-icons" id="edit-button">
                create
              </span>
            </button>
          </Link>
          <Link to={`/reservations/${reservation.id}/share`}>
            <button>
              <span className="material-icons" id="share-trip">
                share
              </span>
            </button>
          </Link>
          <button className="delete-button" onClick={handleDeleteResa}>
            <span className="material-icons delete-icon">delete</span>
          </button>
        </div>
      </div>
    );
  });

  function getSum(arr) {
    const costArr = [];
    for (let i = 0; i <= arr.length-1; i++) {
      costArr.push(parseFloat(arr[i].cost));
    }
    return costArr.reduce(function(a, b) {
      return a + b;
    }, 0);
  };
  const totalCost = getSum(reservations);

  return (
    <div className="Trip-Details">
      <h3>{trip.name}<br />
      <span onClick={toggleInput} id="update-name">edit</span>
      </h3>
      <div className={updateInput}>
        <input
          type="name"
          name="name"
          placeholder="Rename this trip"
          value={trip.name}
          onChange={handleNameChange}
        ></input><br />
        <button onClick={handleNameUpdate}><span className="material-icons">
done_all
</span></button>
      </div>
      <div className="Reservations-Container">
        {reservationsToDisplay.length !== 0 ? (
          reservationsToDisplay
        ) : (
          <p id="no-res">There are no reservations yet!</p>
        )}
      </div>
      <h4>Total cost: $ {totalCost}</h4>
      <button className="trip-button">
        <Link to="/reservations/new">Add a Reservation</Link>
      </button>
      <button className="trip-button" onClick={handleDeleteTrip}>
        Delete Trip
      </button>
    </div>
  );
}
