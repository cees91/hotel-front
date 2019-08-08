import React from "react";
import Filters from "../filters/Filters";
import { RoomType } from "../rooms/RoomOverview";
import axios from "axios";
import Typography from "@material-ui/core/Typography";

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
  componentDidMount() {}
  public fetchData = async (params: any): Promise<void> => {
    try {
      this.props.history.push({
        pathname: "/rooms",
        state: {
          filters: params
        }
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
  };
  public render(): React.ReactNode {
    return (
      <div>
        <Typography gutterBottom variant="h5" component="h1">
          Welcome to the Molveno Lake Hotel
        </Typography>
        <img src="/molveno.jpg" width="700" />
        <Typography
          gutterBottom
          variant="body2"
          color="textSecondary"
          component="p"
        >
          Please select the amount of guests and the dates for your stay:
        </Typography>
        <br />
        <br />
        <Filters getData={this.fetchData} />
      </div>
    );
  }
}

export default Home;
