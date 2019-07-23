import React from "react";
import RoomView from "./RoomView";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

interface Props {}
interface State {
  rooms: Array<roomType>;
  error: string;
}
type roomType = {
  type: string;
  floor: number;
  roomNumber: number;
  adults: number;
  price: number;
};
class RoomOverview extends React.Component<Props, State> {
  state: State = {
    rooms: [],
    error: ""
  };
  componentDidMount() {
    this.fetchRooms();
  }
  fetchRooms = async () => {
    try {
      const result = await axios.get("/api/rooms");
      this.setState({ rooms: result.data });
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    }
  };
  render() {
    return (
      <>
        {this.state.rooms.map(room => {
          return (
            <Grid item xs>
              <RoomView
                roomType={room.type}
                price={room.price}
                size={room.adults}
                floor={room.floor}
              />
            </Grid>
          );
        })}
      </>
    );
  }
}
export default RoomOverview;
