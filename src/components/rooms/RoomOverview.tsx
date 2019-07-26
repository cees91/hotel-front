import React from "react";
import RoomView from "./RoomView";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
interface Props {
  user: string;
  location: Location;
}
interface Location {
  state: RoomType[];
}
interface State {
  rooms: RoomType[];
  error: string;
}
export interface RoomType {
  type: string;
  floor: number;
  roomNumber: number;
  adults: number;
  children: number;
  price: number;
}
interface RoomResponse {
  data: RoomType[];
}
class RoomOverview extends React.Component<Props, State> {
  public state: State = {
    rooms: [],
    error: ""
  };
  public componentDidMount(): void {
    if (this.props.location.state && this.props.location.state.length > 0) {
      this.setState({ rooms: this.props.location.state });
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
  public render(): React.ReactNode {
    return (
      <>
        {this.state.rooms.map(
          (room): React.ReactNode => {
            return (
              <Grid key={room.roomNumber} item xs>
                <RoomView
                  roomType={room.type}
                  price={room.price}
                  adults={room.adults}
                  child={room.children}
                  floor={room.floor}
                />
              </Grid>
            );
          }
        )}
      </>
    );
  }
}
export default RoomOverview;
