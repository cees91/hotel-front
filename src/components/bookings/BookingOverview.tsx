import React from "react";
import { NavLink } from "react-router-dom";
interface Props {
  any: any;
  location: any;
}
interface State {
  currentBooking: currentBooking;
  isLoggedIn: boolean;
}
interface currentBooking {
  type: string;
  price: string;
  id: string;
}
class BookingOverview extends React.Component<Props, State> {
  public state: State = {
    currentBooking: this.props.location.state.room,
    isLoggedIn: false
  };
  checkLogin = async () => {};
  public render(): React.ReactNode {
    if (!this.state.isLoggedIn) {
      return (
        <div>
          Please <NavLink to="/login">log in</NavLink> or{" "}
          <NavLink to="/register">register</NavLink> for an account
        </div>
      );
    }
    return (
      <div>
        BOOK ROOM (IN PROGRESS) type: {this.state.currentBooking.type}, price:{" "}
        {this.state.currentBooking.price}, id: {this.state.currentBooking.id}
      </div>
    );
  }
}

export default BookingOverview;
