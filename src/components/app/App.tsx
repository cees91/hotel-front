import React from "react";
import "./App.css";

import RoomOverview from "../rooms/RoomOverview";
import BookingOverview from "../bookings/BookingOverview";
import Home from "../home/Home";
import MenuBar from "../menu/MenuBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Register from "../register/register";
import Login from "../register/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Logout from "../register/Logout";
import Confirmation from "../confirmation/Confirmation";
interface Routes {
  path: string;
  exact: boolean;
  component: any;
}
interface State {}
class App extends React.Component<object, State> {
  public state: State = {};
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
      {
        path: "/logout",
        exact: false,
        component: Logout
      },
      {
        path: "/login",
        exact: false,
        component: Login
      },
      { path: "/register", exact: false, component: Register },
      { path: "/bookings", exact: false, component: BookingOverview },
      { path: "/confirmation", exact: false, component: Confirmation }
    ];

    return (
      <>
        <MenuBar />
        {/* <Filters getData={this.fetchData} /> */}
        <br />

        <Container style={{ textAlign: "center" }}>
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
      </>
    );
  }
}

export default App;
