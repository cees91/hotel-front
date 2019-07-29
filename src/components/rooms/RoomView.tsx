import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import Axios from "axios";
import RoomType from "./RoomOverview";
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

interface Props {
  type: number;
  floor: number;
  roomNumber: number;
  adults: number;
  children: number;
  price: number;
  id: number;
  bookRoom: any;
}

const RoomView: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const classes = useStyles();
  const { type, floor, price, adults, children, bookRoom } = props;

  const roomTypes = ["single", "double", "two double", "penthouse"];

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
            {roomTypes[type]}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            This is a {roomTypes[type]} room located on floor {floor}.
          </Typography>
          <br />
          <Typography variant="body2" color="textSecondary" component="p">
            It costs &euro;{price},-.
          </Typography>
          <br />
          <Typography variant="body2" color="textSecondary" component="p">
            This room has capacity for {adults} adult(s) and {children}{" "}
            children.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => bookRoom(props)}>
          Book room
        </Button>
        <Button size="small" color="primary">
          View room details
        </Button>
      </CardActions>
    </Card>
  );
};

export default RoomView;
