import React from "react";
import "./App.css";
import axios from "axios";
import RoomOverview from "../rooms/RoomOverview";
import BookingOverview from "../bookings/BookingOverview";
import Home from "../home/Home";
import MenuBar from "../menu/MenuBar";
import { Container } from "../styled-components/Container";
import Grid from "@material-ui/core/Grid";
import Filters from "../filters/Filters";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

interface Routes {
  path: string;
  exact: boolean;
  component: any;
}
class App extends React.Component<object> {
  public render(): React.ReactNode {
    const routes: Routes[] = [
      {
        path: "/",
        exact: true,
        component: Home
      },
      {
        path: "/rooms",
        exact: false,

        component: RoomOverview
      },
      { path: "/bookings", exact: false, component: BookingOverview }
    ];

    return (
      <Router>
        <MenuBar />
        {/* <Filters getData={this.fetchData} /> */}
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
                      exact={route.exact}
                      component={route.component}
                      key={route.path}
                    />
                  );
                }
              )}
            </Switch>
          </Grid>
        </Container>
      </Router>
    );
  }
}

export default App;
