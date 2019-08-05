import React from "react";
import { NavLink } from "react-router-dom";
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

  // App "actions" (functions that modify state)
  signIn(username, password) {
    // This is where you would call Firebase, an API etc...
    // calling setState will re-render the entire app (efficiently!)
    const storage = localStorage.getItem("user");
    const user = JSON.parse(storage);
    if (user && user.email === username && user.password === password) {
      this.setState(
        {
          user: {
            username,
            password
          }
        },
        () => {
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          this.props.history.push("/bookings");
          window.location.reload();
        }
      );
    } else {
      console.log(`incorrect:`, user);
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
