import React, { useState } from 'react';
import './Dashboard.css';

import Flight from '../forms/Flight';
import Stay from '../forms/Stay';
import Activity from '../forms/Activity';
import Other from '../forms/Other';

export default function NewReservation() {

    const [category, setCategory] = useState({
        flight: "collapse",
        stay: "collapse",
        activity: "collapse",
        other: "collapse"
    });

    const pickCategory = () => {

    };

    const toggleCategory = () => {

    };

    return (
        <div className="Res-Form">
            <h2>Add a Reservation</h2>
            <div>
                <h3>Fly</h3>
                <button><span className="material-icons">expand_more</span></button>
                <Flight 
                className={category.flight}
                />
            </div>
            <div>
                <h3>Stay</h3>
                <button><span className="material-icons">expand_more</span></button>
                <Stay 
                className={category.stay}
                />
            </div>
            <div>
                <h3>Do</h3>
                <button><span className="material-icons">expand_more</span></button>
                <Activity 
                className={category.activity}
                />
            </div>
            <div>
                <h3>Everything else</h3>
                <button><span className="material-icons">expand_more</span></button>
                <Other 
                className={category.other}
                />
            </div>
        </div>
    )
}
