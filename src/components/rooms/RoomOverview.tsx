import React from "react";
import RoomView from "./RoomView";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
interface Props {
  user: string;
  location: Location;
  history: any;
}
interface Location {
  state: State;
}

interface State {
  rooms: RoomType[];
  roomTypes: RoomType[];
  error: string;
  filters: any;
  totalRooms: number[];
  [x: string]: any;
}
export interface RoomType {
  type: string;
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
    totalRooms: [0, 0, 0, 0],
    roomTypes: [],
    error: "",
    filters: this.props.location.state.filters,
    filteredRooms: []
  };
  public componentDidMount(): void {
    this.fetchAll();

    if (this.props.location.state) {
      this.setState({
        rooms: this.props.location.state.rooms,
        filters: this.props.location.state.filters
      });
    }
  }
  private fetchAll = () => {
    this.fetchTotal();
    this.fetchRooms();
  };
  private fetchTotal = async (): Promise<void> => {
    try {
      const { data }: RoomResponse = await axios.get("/api/rooms/all");
      this.sortRooms(data, "totalRooms");
    } catch (error) {
      this.setState({ error: error.message });
    }
  };
  private sortRooms = (data: any, type: string): void => {
    const singleRooms = data.filter((room: any) => room.type === "Single");
    const doubleRooms = data.filter((room: any) => room.type === "Double");
    const twoDouble = data.filter((room: any) => room.type === "TwoDouble");
    const pentHouse = data.filter((room: any) => room.type === "Penthouse");
    const rooms = [
      singleRooms.length,
      doubleRooms.length,
      twoDouble.length,
      pentHouse.length
    ];
    const roomTypes = [
      singleRooms[0],
      doubleRooms[0],
      twoDouble[0],
      pentHouse[0]
    ];
    console.log(rooms);
    this.setState({ [type]: rooms, roomTypes });
  };
  private fetchRooms = async (): Promise<void> => {
    try {
      const { data }: RoomResponse = await axios.get("/api/rooms/findrooms", {
        params: this.state.filters
      });
      this.sortRooms(data, "filteredRooms");
      this.setState({ rooms: data });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };
  public bookRoom = async (room: any): Promise<void> => {
    try {
      const roomToBook = { ...room };
      delete roomToBook.bookRoom;
      roomToBook.startDate = this.state.filters.startDate;
      roomToBook.endDate = this.state.filters.endDate;
      localStorage.setItem("room", JSON.stringify(roomToBook));
      this.props.history.push({
        pathname: "/bookings",
        state: {
          room: roomToBook
        }
      });
      await axios.post("/api/rooms/bookroom", roomToBook);
      this.fetchAll();
    } catch (error) {
      console.log(error);
    }
  };
  public render(): React.ReactNode {
    return (
      <>
        {this.state.roomTypes.map(
          (room, i): React.ReactNode => {
            return (
              <Grid key={room.id} item xs={6}>
                <RoomView
                  {...room}
                  totalRooms={this.state.totalRooms[i]}
                  roomsLeft={this.state.filteredRooms[i]}
                  bookRoom={this.bookRoom}
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
