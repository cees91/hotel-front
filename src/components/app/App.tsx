import React from "react";
import "./App.css";

import RoomOverview from "../rooms/RoomOverview";
import BookingOverview from "../bookings/BookingOverview";
import Home from "../home/Home";
import MenuBar from "../menu/MenuBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
<<<<<<< HEAD
import Register from "../register/register";
import Login from "../register/Login";
import { BrowserRouter as Router, Route, Switch,NavLink } from "react-router-dom";
import Logout from "../register/Logout";
import Config from "../config/Config";
=======
import Register from "../useraccount/register";
import Login from "../useraccount/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Confirmation from "../confirmation/Confirmation";
import Logout from "../useraccount/Logout";
import ConfirmationBooking from "../useraccount/Confirmation";
import Userprofile from "../useraccount/Userprofile";
import Contact from "../contact/Contact";
import { UserProvider, AppContextInterface } from "./UserContext";
import axios from "axios";
import AllBookings from "../bookings/AllBookings";
>>>>>>> develop
interface Routes {
  path: string;
  exact: boolean;
  component: any;
}
interface State {
  user: any;
}

class App extends React.Component<object, State> {
  public state: State = {
    user: {}
  };

  async componentDidMount() {
    try {
      const uuid = localStorage.getItem("uuid");
      if (uuid) {
        const result = await axios.get(`/api/login/?uuid=${uuid}`);
        this.setState({ user: result.data });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }
  public setUser = (user: any) => {
    this.setState({ user: user });
  };
  public render(): React.ReactNode {
    const routes: Routes[] = [
      {
        path: "/",
        exact: true,
        component: Home
      },
      {
        path: "/allbookings",
        exact: false,
        component: AllBookings
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
      {
        path: "/confirmation",
        exact: false,
        component: ConfirmationBooking
      },
      {
        path: "/userprofile",
        exact: false,
        component: Userprofile
      },
      {
        path: "/contact",
        exact: false,
        component: Contact
      },

      { path: "/register", exact: false, component: Register },
      { path: "/bookings", exact: false, component: BookingOverview },
      { path: "/confirmation", exact: false, component: Confirmation }
    ];
    const sampleAppContext: AppContextInterface = {
      value: this.state.user,
      setUser: this.setUser
    };
    return (
<<<<<<< HEAD
      <Router>
        <MenuBar />
        <br />
        <NavLink to="edit">To ala component</NavLink>
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
      </Router>
=======
      <>
        <UserProvider value={sampleAppContext}>
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
        </UserProvider>
      </>
>>>>>>> develop
    );
  }
}

export default App;
