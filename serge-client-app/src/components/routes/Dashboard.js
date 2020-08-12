import React from 'react';

export default function Dashboard(props) {
    return (
        <div>
            <div>
                <h1>Dashboard</h1>
                <h2>Status: {props.loggedInStatus}</h2>
            </div>
        </div>
    )
};



