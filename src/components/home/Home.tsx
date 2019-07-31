import React from "react";
import Filters from "../filters/Filters";
import { RoomType } from "../rooms/RoomOverview";
import axios from "axios";
interface Props {
  history: any;
}
interface State {
  rooms: RoomType[];
}

class Home extends React.Component<Props, State> {
  public state: State = {
    rooms: []
  };
  public fetchData = async (params: any): Promise<void> => {
    try {
      const result = await axios.get("/api/rooms/findrooms", { params });
      console.log(result);
      this.props.history.push({
        pathname: "/rooms",
        state: {
          rooms: result.data,
          filters: params
        }
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
  };
  public render(): React.ReactNode {
    return <Filters getData={this.fetchData} />;
  }
}

export default Home;
