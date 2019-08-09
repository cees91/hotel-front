import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import UserContext from "../app/UserContext";

const Welcome = ({ user, onSignOut }) => {
  // This is a dumb "stateless" component
  return (
    <div>
      Welcome <strong>{user.username}</strong>!
      <a href="javascript:;" onClick={onSignOut}>
        Sign out
      </a>
    </div>
  );
};

class LoginForm extends React.Component {
  // Using a class based component here because we're accessing DOM refs
  constructor() {
    super();
    this.state = {
      emailAddress: "",
      password: ""
    };
  }
  handleSignIn(e) {
    e.preventDefault();
    let username = this.state.emailAddress;
    let password = this.state.password;
    this.props.onSignIn(username, password);
  }
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <div className="background-login">
        <form onSubmit={this.handleSignIn.bind(this)}>
          <h3>Please sign in to your account:</h3>
          <br />
          <br />
          <div className="emailLogin">
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              value={this.state.emailAddress}
              onChange={this.changeHandler}
              placeholder="enter your email"
              name="emailAddress"
            />
          </div>
          <div className="passwordLogin">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.changeHandler}
              placeholder="enter password"
              name="password"
            />
          </div>
          <input type="submit" value="Login" />
          <br />
        </form>
        <br />
        <br />
        <div classname="confirmation">
          <NavLink style={{ textAlign: "center" }} to="/register">
            Or sign up for an account
          </NavLink>
        </div>
      </div>
    );
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    // the initial application state
    this.state = {
      user: null
    };
  }
  static contextType = UserContext;

  // App "actions" (functions that modify state)
  async signIn(username, password) {
    let user = null;
    const body = {
      emailAddress: username,
      password: password
    };
    try {
      const result = await axios.post("/api/login", body);
      localStorage.setItem("uuid", result.data);
      user = await axios.get("/api/login", { params: { uuid: result.data } });
    } catch (error) {
      console.log(error.response.data);
    }
    if (user) {
      this.context.setUser(user.data);
      this.props.history.push("/userprofile");
    }
  }

  signOut() {
    // clear out user from state
    this.setState({ user: null });
  }

  render() {
    // Here we pass relevant state to our child components
    // as props. Note that functions are passed using `bind` to
    // make sure we keep our scope to App
    return (
      <div>
        {this.state.user ? (
          <Welcome user={this.state.user} onSignOut={this.signOut.bind(this)} />
        ) : (
          <LoginForm onSignIn={this.signIn.bind(this)} />
        )}
      </div>
    );
  }
}
export default Login;
