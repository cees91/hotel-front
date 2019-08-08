import React, { Component } from "react";
import { render } from "react-dom";
import "./styles.css";
import PasswordInput from "../password/PasswordInput";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import SendIcon from "@material-ui/icons/Send";
import axios from "axios";
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  }
}));

const validate = ({
  firstName,
  lastName,
  email,
  password,
  password_check,
  address,
  houseNumber,
  postcode,
  city,
  phoneNumber
}) => {
  return {
    firstName: firstName.length === 0,
    lastName: lastName.length === 0,
    address: address.length === 0,
    houseNumber: houseNumber.length === 0,
    postcode: postcode.length === 0,
    city: city.length === 0,
    email: email.length === 0,
    password: password.length === 0,
    password_check: password.length === 0,
    phoneNumber: phoneNumber.length === 0
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
      password_check: "",
      phoneNumber: "",
      isValidated: false,
      error: false,
      message: ""
    };
  }

  checkPassword() {
    if (
      !this.state.password ||
      this.state.password !== this.state.password_check
    ) {
      this.setState({ password_has_error: true });
      return false;
    } else {
      this.setState({ password_has_error: false });
      return true;
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value, error: false });
  };

  handleSubmit = async () => {
    // event.preventDefault();
    if (!this.isValidated()) {
      const {
        firstName,
        lastName,
        address,
        houseNumber,
        postcode,
        city,
        email,
        phoneNumber,
        password,
        password_check
      } = this.state;
      if (this.checkPassword()) {
        const user = {
          firstName,
          lastName,
          address,
          houseNumber,
          postcode,
          city,
          emailAddress: email,
          password,
          phoneNumber
        };
        // localStorage.setItem("user", JSON.stringify(user));
        await axios.post("/api/user/create/guest", user);
        localStorage.setItem("user", JSON.stringify(user));
        this.props.history.push("/confirmation");
      }
    }
  };

  isValidated() {
    const errors = validate(this.state);
    const isError = Object.keys(errors).filter(key => errors[key]);
    if (isError.length > 0) {
      this.setState({
        error: true,
        message: `Please fill in ${isError.map(
          word => ` ${word.toLowerCase()}`
        )}`
      });
      return true;
    }
    return false;
  }

  render() {
    return (
      <div className="background">
        {/* <img src="/molveno_lake.jpg" /> */}
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
                name="email"
                onChange={this.handleChange}
                noValidate
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <PasswordInput
                handleChanges={this.handleChange}
                value={this.state.password}
                placeholder="Type your password"
              />
            </div>
            <div className="password_check">
              <label htmlFor="password">Re-enter password</label>
              <input
                type="password"
                name="password_check"
                onChange={this.handleChange}
                noValidate
                placeholder="Please confirm your password"
              />
            </div>
            <div className="info">
              <small>
                Choose a strong password.
                <br />
              </small>
            </div>
            {this.state.error ? <div>{this.state.message}</div> : null}
            <div className="submit">
              <Button
                variant="contained"
                color="primary"
                disabled={this.state.error}
                onClick={() => this.handleSubmit()}
              >
                Create account{" "}
                {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                <SendIcon style={{ marginLeft: "10px", fontSize: "20px" }} />
              </Button>
            </div>

            {/* </form> */}
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
