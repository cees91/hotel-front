import React from "react";
import Typography from "@material-ui/core/Typography";
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
                <div key={property}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {property.slice(0, 1).toUpperCase() +
                      property.slice(1).toLowerCase()}
                    : {this.state.user[property]}
                  </Typography>
                  <br />
                </div>
              );
            })}
          </>
        ) : null}
      </div>
    );
  }
}
