import React from "react";
import "./App.css";
import RoomOverview from "../rooms/RoomOverview";
import BookingOverview from "../bookings/BookingOverview";
import MenuBar from "../menu/MenuBar";
import { Container } from "../styled-components/Container";
import Grid from "@material-ui/core/Grid";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

interface Routes {
  path: string;
  component: any;
}
class App extends React.Component<object> {
  public render(): React.ReactNode {
    const routes: Routes[] = [
      {
        path: "/rooms",
        component: RoomOverview
      },
      { path: "/bookings", component: BookingOverview }
    ];
    return (
      <Router>
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
            <Switch>
              {routes.map(
                (route): JSX.Element => {
                  return (
                    <Route
                      path={route.path}
                      component={route.component}
                      key={route.path}
                    />
                  );
                }
              )}
              {/* <RoomOverview user="cees" /> */}
            </Switch>
          </Grid>
        </Container>
      </Router>
    );
  }
}

export default App;
