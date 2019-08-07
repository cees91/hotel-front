import React from "react";
import Typography from "@material-ui/core/Typography";

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
      <div>
        {Object.keys(this.state.user).length > 0 ? (
          <>
            <div className="userprofile">
              <br />
              <h2>
                <strong>{this.state.user.firstName}</strong>, check your
                personal information. If anything should be updated, please let
                us know.
              </h2>
              <br />
            </div>
            {Object.keys(this.state.user).map(property => {
              return (
                <>
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
                  <br />
                </>
              );
            })}
          </>
        ) : null}
      </div>
    );
  }
}
