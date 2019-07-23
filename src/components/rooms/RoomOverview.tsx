import React from "react";
import RoomView from "./RoomView";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
interface Props {
  user: string;
}
interface State {
  rooms: RoomType[];
  error: string;
}
interface RoomType {
  type: string;
  floor: number;
  roomNumber: number;
  adults: number;
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
    this.fetchRooms();
  }
  private fetchRooms = async (): Promise<void> => {
    try {
      const { data }: RoomResponse = await axios.get("/api/rooms");
      this.setState({ rooms: data });
    } catch (error) {
      console.log(error);
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
                  size={room.adults}
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
