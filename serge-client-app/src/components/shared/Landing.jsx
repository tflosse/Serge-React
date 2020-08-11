import React from "react";
import { Link } from "react-router-dom";
import './Landing.css';

const Landing = (props) => {

    return (
        <div className="Landing-Page">
            <div className="Logo-Container">
                <img className="Landing-logo" src="https://i.imgur.com/EfFEtiL.gif" alt="Serge Logo"/>  
            </div>
            {/* <div className="Message-Container"> */}
                <div className="Welcome-Message">
                    <h3>We set out to help you bring back the two things we missed most: traveling & socializing.</h3>
                    <p>
                    Serge is your new travel organizer. Keep and navigate flight, hotel, and other reservation details to one place, share itineraries with friends, budget for costs, and split the bills.
                    </p>
                    <Link to="/register" >
                    <button className="submit" type="submit">
                    Hire Serge <span className="material-icons">login</span>
                    </button>
                    </Link>
                </div>
            {/* </div> */}
        </div>
    );
  };
  
  export default Landing;