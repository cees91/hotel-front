import React from "react";
interface Props {
  any: any;
  location: any;
}
interface State {
  currentBooking: object;
}
class BookingOverview extends React.Component<Props, State> {
  public render(): React.ReactNode {
    return (
      <div>
        BOOK ROOM (IN PROGRESS) type: {this.props.location.state.room.type},
        price: {this.props.location.state.room.price}, id:{" "}
        {this.props.location.state.room.id}
      </div>
    );
  }
}

export default BookingOverview;
