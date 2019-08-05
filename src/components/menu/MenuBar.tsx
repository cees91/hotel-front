import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #fff;
`;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

export default function ButtonAppBar(): JSX.Element {
  const classes = useStyles();
  const userStorage = localStorage.getItem("loggedInUser");

  const [loggedIn, setLoggedIn] = React.useState({
    email: null,
    firstName: ""
  });

  useEffect(() => {
    if (userStorage) {
      const user = JSON.parse(userStorage);
      setLoggedIn(user);
    }
  }, [userStorage]);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
          
       
          </IconButton> */}
          {loggedIn.email ? (
            <Typography variant="h6" className={classes.title}>
              welcome {loggedIn.firstName}
            </Typography>
          ) : null}
          <Typography variant="h6" className={classes.title}>
            <StyledLink to="/">
              <Button color="inherit">Home</Button>
            </StyledLink>
          </Typography>
          {/* <Typography variant="h6" className={classes.title}>
            <StyledLink to="/rooms">
              <Button color="inherit">Rooms</Button>
            </StyledLink>
          </Typography> */}
          <Typography variant="h6" className={classes.title}>
            <StyledLink to="/bookings">
              <Button color="inherit">Booking</Button>
            </StyledLink>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <StyledLink to="/contact">
              <Button color="inherit">Contact us</Button>
            </StyledLink>
          </Typography>
          {loggedIn.email ? (
            <Typography variant="h6" className={classes.title}>
              <StyledLink to="/logout">Logout</StyledLink>
            </Typography>
          ) : (
            <Button color="inherit">
              <StyledLink to="/login">Login</StyledLink>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
