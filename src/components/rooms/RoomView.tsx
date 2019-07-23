import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(
  createStyles({
    card: {
      maxWidth: 345,
      minWidth: 300,
      margin: "0 auto"
    },
    media: {
      height: 140
    }
  })
);

type Props = {
  roomType: string;
  price: number;
  size: number;
  roomDescription: string;
};

const RoomView: React.FC<Props> = props => {
  const classes = useStyles();
  const { roomType, roomDescription, price, size } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/download.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {roomType}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {roomDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Add
        </Button>
        <Button size="small" color="primary">
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default RoomView;