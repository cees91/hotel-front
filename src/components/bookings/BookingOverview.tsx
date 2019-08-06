import React from "react";
import { NavLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";
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
      const room = JSON.parse(roomStorage);
      const user = JSON.parse(storage);
      this.setState({ user, currentBooking: room });
    }
  }

  handleBooking = async () => {
    alert("room booked!");
    try {
      // await axios.post("/api/booking",  )
    } catch (error) {}
  };
  public render(): React.ReactNode {
    if (!this.state.user.email) {
      return (
        <div>
          Please <NavLink to="/login">log in</NavLink> or{" "}
          <NavLink to="/register">register</NavLink> for an account
        </div>
      );
    } else if (this.state.currentBooking[0]) {
      return (
        <div>
          <img src={`${this.state.currentBooking[0].type}.jpeg`} />
          <br />
          <h2>
            Please review the booking details and confirm the booking by
            pressing the 'book now' button
          </h2>
          BOOK ROOM type: {this.state.currentBooking[0].type} <br />
          Amount of rooms: {this.state.currentBooking.length} <br />
          dates: {this.state.currentBooking[0].startDate} -{" "}
          {this.state.currentBooking[0].endDate}
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
                  {property.slice(0, 1).toUpperCase() +
                    property.slice(1).toLowerCase()}
                  : {this.state.user[property]}
                </Typography>
              );
            }
          })}
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={this.handleBooking}
          >
            Book room
          </Button>
        </div>
      );
    }
  }
}

export default BookingOverview;
