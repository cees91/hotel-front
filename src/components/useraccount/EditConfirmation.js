import React from "react";
import { NavLink } from "react-router-dom";

export default class EditConfirmation extends React.Component {
  constructor() {
    super();
  }
  render() {
    const storage = localStorage.getItem("user");
    const user = JSON.parse(storage);
    return (
      <div className="confirmation">
        <br />
        <h2>
          <strong>{user.firstName}</strong>, your profile has been edited
          succesfully!
        </h2>
        <br />
      </div>
    );
  }
}
