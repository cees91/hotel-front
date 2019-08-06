import React from "react";

const Logout = props => {
  localStorage.removeItem("loggedInUser");
  props.history.push("/");
  window.location.reload();
  return <div />;
};

export default Logout;
