import React from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
export default class AllBookings extends React.Component {
  constructor() {
    super();
    this.state = {
      bookings: []
    };
  }
  async componentDidMount() {
    try {
      const bookings = await axios.get("/api/bookings");
      this.setState({ bookings: bookings.data });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Start date</TableCell>
                <TableCell align="right">End date</TableCell>
                <TableCell align="right">Number of guests</TableCell>
                <TableCell align="right">Number of rooms</TableCell>
                <TableCell align="right">Booked room numbers</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.bookings.map(booking => {
                console.log(booking);
                return (
                  <TableRow key={booking.id}>
                    <TableCell component="th" scope="row">
                      {booking.user
                        ? booking.user.firstName + " " + booking.user.lastName
                        : null}
                    </TableCell>
                    <TableCell align="right">{booking.startDate}</TableCell>
                    <TableCell align="right">{booking.endDate}</TableCell>
                    <TableCell align="right">
                      {booking.numberOfGuests}
                    </TableCell>
                    <TableCell align="right">
                      {booking.bookedRooms.length}
                    </TableCell>
                    <TableCell align="right">
                      {booking.bookedRooms.map(room => room.id).join(", ")}
                    </TableCell>
                    {/* <TableCell align="right">{row.protein}</TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
