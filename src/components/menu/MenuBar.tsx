import React from "react";
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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            {/* <MenuIcon /> */}
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            <StyledLink to="/rooms">
              <Button color="inherit">Rooms</Button>
            </StyledLink>
          </Typography>
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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
