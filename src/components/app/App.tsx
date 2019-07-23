import React from "react";
import "./App.css";
import RoomOverview from "../rooms/RoomOverview";
import MenuBar from "../menu/MenuBar";
import { Container } from "../styled-components/Container";
import Grid from "@material-ui/core/Grid";

class App extends React.Component<object> {
  public render(): React.ReactNode {
    return (
      <>
        <MenuBar />
        <br />
        <Container>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <RoomOverview user="cees" />
          </Grid>
        </Container>
      </>
    );
  }
}

export default App;
