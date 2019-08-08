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

  handleSignIn(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    this.props.onSignIn(username, password);
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSignIn.bind(this)}>
          <h3>Sign in</h3>
          <input
            type="text"
            ref="username"
            placeholder="enter you username"
            name="username"
          />
          <input
            type="password"
            ref="password"
            placeholder="enter password"
            name="password"
          />
          <input type="submit" value="Login" />
          <br />
        </form>
        <br />
        <NavLink style={{ textAlign: "center" }} to="/register">
          Or sign up for an account
        </NavLink>
      </>
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
