import React from "react";
import RoomView from "./RoomView";
import axios from "axios";
interface Props {}
interface State {
  rooms: [
    {
      roomType: string;
      price: number;
      size: number;
      roomDescription: string;
    }
  ];
}
class RoomOverview extends React.Component<Props, State> {
  state: State = {
    rooms: [
      { roomType: "bla", price: 1, size: 1, roomDescription: "super nice room" }
    ]
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
    }
  };
  render() {
    return (
      <div style={{ textAlign: "center", position: "relative", top: "50px" }}>
        {this.state.rooms.map(room => {
          return (
            <RoomView
              roomType={room.roomType}
              price={room.price}
              size={room.size}
              roomDescription={room.roomDescription}
            />
          );
        })}
      </div>
    );
  }
}
export default RoomOverview;
