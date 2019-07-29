import React from "react";
import RoomView from "./RoomView";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
interface Props {
  user: string;
  location: Location;
}
interface Location {
  state: State;
}

interface State {
  rooms: RoomType[];
  error: string;
  dates: any;
}
export interface RoomType {
  type: number;
  floor: number;
  roomNumber: number;
  adults: number;
  children: number;
  price: number;
  id: number;
}
interface RoomResponse {
  data: RoomType[];
}
class RoomOverview extends React.Component<Props, State> {
  public state: State = {
    rooms: [],
    error: "",
    dates: {}
  };
  public componentDidMount(): void {
    if (this.props.location.state) {
      this.setState({
        rooms: this.props.location.state.rooms,
        dates: this.props.location.state.dates
      });
    } else {
      this.fetchRooms();
    }
  }
  private fetchRooms = async (): Promise<void> => {
    try {
      const { data }: RoomResponse = await axios.get("/api/rooms");
      this.setState({ rooms: data });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };
  public bookRoom = async (room: any): Promise<void> => {
    try {
      const roomToBook = { ...room };
      delete roomToBook.bookRoom;
      roomToBook.startDate = this.state.dates.startDate;
      roomToBook.endDate = this.state.dates.endDate;
      console.log(JSON.stringify(roomToBook));

      await axios.post("/api/rooms/bookroom", roomToBook);
    } catch (error) {
      console.log(error);
    }
  };
  public render(): React.ReactNode {
    return (
      <>
        {this.state.rooms.map(
          (room): React.ReactNode => {
            return (
              <Grid key={room.id} item xs>
                <RoomView {...room} bookRoom={this.bookRoom} />
              </Grid>
            );
          }
        )}
      </>
    );
  }
}
export default RoomOverview;
