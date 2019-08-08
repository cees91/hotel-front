import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2)
  }
}));

export default function PaperSheet() {
  const classes = useStyles();
  const storage = localStorage.getItem("user");
  const user = JSON.parse(storage);
  return (
    <div>
      <h2>
        <strong>{user.firstName}</strong>, please find our contactdetails below:
      </h2>
      <br />
      <div>
        <Paper className={classes.paper}>
          <Typography component="p">
            Molveno Lake Resort <br />
            Via Bettega 12 <br />
            38018 Molveno (Tn) <br />
            Italia
          </Typography>
        </Paper>
      </div>
    </div>
  );
}
