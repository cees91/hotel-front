import React from "react";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";

export default class Userprofile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    const storage = localStorage.getItem("user");
    const user = JSON.parse(storage);
    delete user.password;
    this.setState({ user });
  }

  render() {
    return (
      <div className="form-wrapper">
        <h2>Edit profile</h2>
        {/* <form noValidate> */}
        <div className="firstName">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
            noValidate
          />
        </div>
        <div className="lastName">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            onChange={this.handleChange}
            noValidate
          />
        </div>
        <div className="address">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            onChange={this.handleChange}
            noValidate
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            maxWidth: "100%"
          }}
        >
          <div className="houseNumber">
            <label htmlFor="houseNumber">House Number</label>
            <input
              type="number"
              name="houseNumber"
              style={{ width: "50%" }}
              onChange={this.handleChange}
              noValidate
            />
          </div>
          <div className="postcode">
            <label htmlFor="postcode">Postcode</label>
            <input
              type="text"
              name="postcode"
              onChange={this.handleChange}
              noValidate
            />
          </div>
        </div>
        <div className="city">
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            onChange={this.handleChange}
            noValidate
          />
        </div>
        <div className="phoneNumber">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            onChange={this.handleChange}
            noValidate
          />
        </div>
        <div className="email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="emailAdress"
            onChange={this.handleChange}
            noValidate
          />
        </div>
        {this.state.error ? <div>{this.state.message}</div> : null}
        <br />
        <br />
        <div className="submit">
          <Button
            variant="contained"
            color="primary"
            disabled={this.state.error}
            onClick={() => this.handleSubmit()}
          >
            Edit account{" "}
            {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
            <EditIcon style={{ marginLeft: "10px", fontSize: "20px" }} />
          </Button>
        </div>
        {/* </form> */}
      </div>
    );
  }
}
