import React from "react";
interface Props {
  any: any;
}
interface State {
  currentBooking: object;
}
class BookingOverview extends React.Component<Props, State> {
  public render(): React.ReactNode {
    return <div>bookings</div>;
  }
}

export default BookingOverview;
