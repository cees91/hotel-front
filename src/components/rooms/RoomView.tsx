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

interface Props {
  roomType: string;
  price: number;
  adults: number;
  child: number;
  floor: number;
}

const RoomView: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const classes = useStyles();
  const { roomType, floor, price, adults, child } = props;

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
            This is a {roomType.toLowerCase()} room located on floor {floor}.
          </Typography>
          <br />
          <Typography variant="body2" color="textSecondary" component="p">
            It costs &euro;{price},-.
          </Typography>
          <br />
          <Typography variant="body2" color="textSecondary" component="p">
            This room has capacity for {adults} adult(s) and {child} children.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
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
