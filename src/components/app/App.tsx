import React from "react";
import "./App.css";
import RoomOverview from "../rooms/RoomOverview";
import MenuBar from "../menu/MenuBar";
import { Container } from "../styled-components/Container";
import Grid from "@material-ui/core/Grid";

interface Props {}
interface State {}
class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <MenuBar />
        <Grid container direction="row" justify="center" alignItems="center">
          <RoomOverview />
        </Grid>
      </>
    );
  }
}

export default App;
