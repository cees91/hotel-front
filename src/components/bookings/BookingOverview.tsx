import React from "react";
import { NavLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { RoomType } from "../rooms/RoomOverview";
import UserContext from "../app/UserContext";

interface Props {
  any: any;
  location: any;
  history: any;
}
interface State {
  currentBookings: any;
  isLoggedIn: boolean;
  user: any;
  allBookings: any | null;
  edit: boolean;
  currentBooking: any;
}
interface currentBookings {
  type: string;
  price: string;
  id: string;
}
class BookingOverview extends React.Component<Props, State> {
  public state: State = {
    currentBookings: [],
    isLoggedIn: false,
    user: {},
    allBookings: [],
    edit: false,
    currentBooking: {}
  };
  static contextType = UserContext;

  async componentDidMount() {
    try {
      const roomStorage = localStorage.getItem("room");
      let rooms = [];
      const user = this.context.value;

      let booking = roomStorage ? JSON.parse(roomStorage) : [];
      let bookings = null;
      if (!roomStorage) {
        console.log(user);
        bookings = await axios.get(`/api/bookings/?bookingId=${user.id}`);
      }
      console.log(bookings);
      this.setState({
        user,
        currentBookings: booking,
        allBookings: bookings ? bookings.data : null
      });
    } catch (error) {
      console.log(error.response.data);
    }
  }
  useBooking = (booking: any) => {
    this.setState({
      currentBookings: booking.bookedRooms,
      edit: true,
      currentBooking: booking
    });
  };
  cancelBooking = () => {
    localStorage.removeItem("room");
    this.props.history.push("/");
  };
  handleBooking = async () => {
    alert("room booked!");
    try {
      const user = { ...this.state.user };
      const body = {
        user,
        numberOfGuests: this.state.currentBookings[0].numberOfGuests,
        bookedRooms: this.state.currentBookings,
        startDate: this.state.currentBookings[0].startDate,
        endDate: this.state.currentBookings[0].endDate
      };
      await axios.post("/api/bookings", body);
      this.props.history.push("/confirmation");
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
  };
  public render(): React.ReactNode {
    if (this.state.currentBookings.length > 0 && this.state.user) {
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
              Number of guests: {this.state.currentBooking.numberOfGuests}
            </Typography>
            <Typography component="p">
              Dates: {this.state.currentBooking.startDate} -{" "}
              {this.state.currentBooking.endDate}
            </Typography>
          </Paper>
          <br />
          <br />
          <Paper>
            <Typography variant="h5" component="h3">
              User information
            </Typography>
            {Object.keys(this.state.user)
              .filter(
                key =>
                  key !== "userType" &&
                  key !== "bookingsOfUser" &&
                  key !== "authType" &&
                  key !== "userName" &&
                  key !== "id" &&
                  key !== "country"
              )
              .map(property => {
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
          {!this.state.edit ? (
            <>
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={this.handleBooking}
              >
                Book room
              </Button>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={this.cancelBooking}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={this.cancelBooking}
            >
              Go back
            </Button>
          )}
          <br />
          <br />
        </div>
      );
    } else if (this.state.allBookings.length > 0) {
      return (
        <div>
          {this.state.allBookings.map((booking: any) => {
            return (
              <div key={booking.id}>
                <Paper>
                  <Typography variant="h5" component="h3">
                    Date: {booking.startDate} - {booking.endDate}
                    <br />
                    Guests: {booking.numberOfGuests}
                  </Typography>
                  <Button
                    size="small"
                    color="secondary"
                    variant="contained"
                    onClick={() => this.useBooking(booking)}
                  >
                    Select
                  </Button>
                </Paper>
                <br />
              </div>
            );
          })}
        </div>
      );
    } else if (!this.state.user.emailAddress) {
      return (
        <div>
          Please <NavLink to="/login">log in</NavLink> or{" "}
          <NavLink to="/register">register</NavLink> for an account
        </div>
      );
    }
  }
}

export default BookingOverview;
