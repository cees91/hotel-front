import React, { Component } from "react";
import { render } from "react-dom";
import "./styles.css";

const validate = ({
  firstName,
  lastName,
  email,
  password,
  address,
  houseNumber,
  postcode,
  city
}) => {
  return {
    firstName: firstName.length === 0,
    lastName: lastName.length === 0,
    address: address.length === 0,
    houseNumber: houseNumber.length === 0,
    postcode: postcode.length === 0,
    city: city.length === 0,
    email: email.length === 0,
    password: password.length === 0
  };
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      houseNumber: "",
      postcode: "",
      city: "",
      email: "",
      password: "",
      isValidated: false,
      error: false,
      message: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value, error: false });
  };

  handleSubmit = event => {
    // event.preventDefault();
    if (!this.isValidated()) {
      return;
    }
  };

  isValidated() {
    const errors = validate(this.state);
    const isError = Object.keys(errors).filter(key => errors[key]);
    console.log(isError);
    if (isError.length > 0) {
      console.log("errorrr");
      this.setState({
        error: true,
        message: `Please fill in ${isError.map(
          word => ` ${word.toLowerCase()}`
        )}`
      });
      return true;
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h2>Register</h2>
          {/* <form noValidate> */}
          <div className="firstName">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
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
          <div className="houseNumber">
            <label htmlFor="houseNumber">House Number</label>
            <input
              type="number"
              name="houseNumber"
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
          <div className="city">
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              onChange={this.handleChange}
              noValidate
            />
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              onChange={this.handleChange}
              noValidate
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
              noValidate
            />
          </div>
          <div className="info">
            <small>Password must be eight characters in length.</small>
          </div>
          {this.state.error ? <div>{this.state.message}</div> : null}
          <div className="submit">
            <button
              disabled={this.state.error}
              onClick={() => this.handleSubmit()}
            >
              Create
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
    );
  }
}
export default Register;
