import React from "react";
import { NavLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
interface Props {
  any: any;
  location: any;
}
interface State {
  currentBooking: any;
  isLoggedIn: boolean;
  user: any;
}
interface currentBooking {
  type: string;
  price: string;
  id: string;
}
class BookingOverview extends React.Component<Props, State> {
  public state: State = {
    currentBooking: null,
    isLoggedIn: false,
    user: {}
  };
  componentDidMount() {
    const roomStorage = localStorage.getItem("room");

    const storage = localStorage.getItem("loggedInUser");
    if (storage && roomStorage) {
      console.log(storage);
      const room = JSON.parse(roomStorage);
      const user = JSON.parse(storage);
      this.setState({ user, currentBooking: room });
    }
  }
  checkLogin = async () => {};
  handleClickOpen = () => {
    alert("room booked!");
  };
  public render(): React.ReactNode {
    if (!this.state.user.email) {
      return (
        <div>
          Please <NavLink to="/login">log in</NavLink> or{" "}
          <NavLink to="/register">register</NavLink> for an account
        </div>
      );
    } else if (this.state.currentBooking) {
      return (
        <div>
          <img src={`${this.state.currentBooking.type}.jpeg`} />
          <br />
          BOOK ROOM type: {this.state.currentBooking.type} <br />
          id:{this.state.currentBooking.id} <br />
          <br />
          user:{" "}
          {Object.keys(this.state.user).map(property => {
            if (property !== "password") {
              return (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  key={property}
                >
                  {property}: {this.state.user[property]}
                </Typography>
              );
            }
          })}
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={this.handleClickOpen}
          >
            Book room
          </Button>
        </div>
      );
    }
  }
}

export default BookingOverview;
