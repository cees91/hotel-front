import React from "react";
import { NavLink } from "react-router-dom";

export default class Confirmation extends React.Component{
    constructor(){
        super()
    }
    render(){
        const storage = localStorage.getItem("user");
        const user = JSON.parse(storage)
        return(
            <div className="confirmation">
          <br />
          <h2>
          <strong>{user.firstName}</strong>, your account has been created succesfully! Please <NavLink to="/login">log in</NavLink> to manage your bookings.
          </h2>
          <br />
          </div>
        )
    }
}

