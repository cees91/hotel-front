import React from "react";
import Typography from "@material-ui/core/Typography";

export default class Userprofile extends React.Component {
  constructor() {
    super();
  }
  render() {
    const storage = localStorage.getItem("user");
    const user = JSON.parse(storage);
    return (
      <>
        {Object.keys(this.state.user).map(property => {
          return (
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              key={property}
            >
              {property.slice(0, 1).toUpperCase() +
                property.slice(1).toLowerCase()}
              : {this.state.user[property]}
            </Typography>
          );
        })}
      </>
    );
  }
}
