import React from "react";
import Typography from "@material-ui/core/Typography";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import axios from "axios";
import UserContext from "../app/UserContext";

export default class Userprofile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }
  static contextType = UserContext;

  componentDidMount() {
    const user = this.context.value;
    console.log(user);
    this.setState({ user });
  }

  handleChange = event => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value,
        error: false
      }
    });
  };

  handleSubmit = async () => {
    // event.preventDefault();

    try {
      await axios.put("/api/user/update/guest", this.state.user);
      this.props.history.push("/editconfirmation");
    } catch (error) {
      this.setState({ error: true, message: error.response.data.message });
    }
  };

  render() {
    return (
      <div className="form">
        <h2>User profile</h2>
        {/* <form noValidate> */}
        <div className="firstName">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            value={this.state.user.firstName}
            onChange={this.handleChange}
            noValidate
          />
        </div>
        <div className="lastName">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            defaultValue={this.state.user.lastName}
            onChange={this.handleChange}
            noValidate
          />
        </div>
        <div className="address">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            defaultValue={this.state.user.address}
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
              value={this.state.user.houseNumber}
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
              value={this.state.user.postcode}
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
            value={this.state.user.city}
            onChange={this.handleChange}
            noValidate
          />
        </div>
        <div className="phoneNumber">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={this.state.user.phoneNumber}
            onChange={this.handleChange}
            noValidate
          />
        </div>
        <div className="email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="emailAdress"
            value={this.state.user.emailAddress}
            onChange={this.handleChange}
            noValidate
          />
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={this.handleChange}
            value={this.state.user.password}
            placeholder="Type your password"
            readonly
          />
        </div>
        <div className="info">
          <small>
            Please fill in your password
            <br />
          </small>
        </div>
        <div className="password_check">
          <label htmlFor="password">Re-enter password</label>
          <input
            type="password"
            name="password_check"
            onChange={this.handleChange}
            readonly
            placeholder="Please confirm your password"
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
            <SendIcon style={{ marginLeft: "10px", fontSize: "20px" }} />
          </Button>
        </div>
        {/* </form> */}
      </div>
    );
  }
}
