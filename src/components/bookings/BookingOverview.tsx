import React from "react";
import { NavLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
interface Props {
  any: any;
  location: any;
  history: any;
}
interface State {
  currentBookings: any;
  isLoggedIn: boolean;
  user: any;
}
interface currentBookings {
  type: string;
  price: string;
  id: string;
}
class BookingOverview extends React.Component<Props, State> {
  public state: State = {
    currentBookings: null,
    isLoggedIn: false,
    user: {}
  };
  componentDidMount() {
    const roomStorage = localStorage.getItem("room");

    const storage = localStorage.getItem("loggedInUser");
    if (storage && roomStorage) {
      const room = JSON.parse(roomStorage);
      const user = JSON.parse(storage);
      this.setState({ user, currentBookings: room });
    }
  }

  handleBooking = async () => {
    alert("room booked!");
    try {
      const body = {
        user: this.state.user,
        numberOfGuests: this.state.currentBookings[0].numberOfGuests,
        bookedRooms: this.state.currentBookings,
        startDate: this.state.currentBookings[0].startDate,
        endDate: this.state.currentBookings[0].endDate
      };
      await axios.post("/api/bookings", body);
      this.props.history.push("/confirmation");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  public render(): React.ReactNode {
    if (!this.state.user.email) {
      return (
        <div>
          Please <NavLink to="/login">log in</NavLink> or{" "}
          <NavLink to="/register">register</NavLink> for an account
        </div>
      );
    } else if (this.state.currentBookings[0]) {
      return (
        <div>
          <img src={`${this.state.currentBookings[0].type}.jpeg`} />
          <br />
          <Paper>
            <Typography variant="h5" component="h3">
              Please review the booking details and confirm the booking by
              <br />
              pressing the 'book now' button
            </Typography>
          </Paper>
          <br />
          <Paper>
            <Typography variant="h5" component="h3">
              Booking details
            </Typography>
            <Typography component="p">
              Type of room: {this.state.currentBookings[0].type}
            </Typography>
            <Typography component="p">
              Amount of rooms: {this.state.currentBookings.length}
            </Typography>
            <Typography component="p">
              dates: {this.state.currentBookings[0].startDate} -{" "}
              {this.state.currentBookings[0].endDate}
            </Typography>
          </Paper>
          <br />
          <br />
          <Paper>
            <Typography variant="h5" component="h3">
              User information
            </Typography>
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
          </Paper>
          <br />
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={this.handleBooking}
          >
            Book room
          </Button>
          <br />
          <br />
        </div>
      );
    }
  }
}

export default BookingOverview;
