import React from "react";
import axios from "axios";
import UserContext from "../app/UserContext";

class Logout extends React.Component {
  constructor() {
    super();
  }
  static contextType = UserContext;

  async componentDidMount() {
    try {
      const uuid = localStorage.getItem("uuid");
      await axios.delete("/api/login/?uuid=" + uuid);
      localStorage.removeItem("uuid");
      this.context.setUser({});
      this.props.history.push("/");
    } catch (error) {
      console.log(error.response);
    }
  }
  render() {
    return null;
  }
}

export default Logout;
