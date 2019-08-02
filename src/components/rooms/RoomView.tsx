import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import Grid from "@material-ui/core/Grid";

interface Props {
  type: string;
  floor: number;
  roomNumber: number;
  adults: number;
  children: number;
  price: number;
  id: number;
  bookRoom: any;
  totalRooms: number;
  roomsLeft: number;
}
const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative"
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1
    },
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

const RoomView: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const classes = useStyles();
  const { type, floor, price, adults, children, bookRoom } = props;

  const roomTypes = ["single", "double", "two double", "penthouse"];
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/download.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {type}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              This is a {type} room located on floor {floor}. Rooms left:{" "}
              {props.roomsLeft} / {props.totalRooms}
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
          <Button size="small" color="primary" onClick={handleClickOpen}>
            View room details
          </Button>
        </CardActions>
      </Card>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {type}
            </Typography>
            <Button color="inherit" onClick={handleClose}>
              Book
            </Button>
          </Toolbar>
        </AppBar>
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={2}>
            <CardMedia
              className={classes.media}
              image="/download.jpg"
              title="Contemplative Reptile"
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h4">Room description</Typography>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              facilisis elementum neque at eleifend. Nunc nec orci ultrices,
              egestas velit et, pellentesque diam. Mauris aliquam arcu sit amet
              mauris fringilla, et semper libero finibus. Curabitur bibendum
              dolor eget eleifend ultrices. Nunc auctor mauris nec pretium
              convallis. Maecenas sed elit sollicitudin, maximus eros eget,
              maximus dolor. Pellentesque suscipit ornare nibh, in suscipit
              metus commodo vitae. Pellentesque sit amet tincidunt ipsum.
              Curabitur suscipit porta tellus et commodo. Aliquam condimentum
              lectus nec auctor volutpat. Nullam vitae semper tortor.
              Suspendisse tincidunt laoreet hendrerit. Nullam pretium enim
              libero, vel feugiat eros imperdiet sed. Aenean vel gravida lorem.
              Duis tincidunt sapien quis dui volutpat porta. Sed quis dui felis.
              Suspendisse aliquam, enim id maximus rhoncus, quam dui tincidunt
              nibh, id eleifend dui urna eget eros. Proin a iaculis dolor, ut
              iaculis dui. Donec ac varius diam, sed consectetur mauris. Mauris
              quis porttitor dolor, ac congue odio. Curabitur fermentum mi
              lacus, id vestibulum nisl egestas vel. Nulla facilisi. Nulla
              tristique sodales dolor consequat gravida. Proin ultricies purus
              eu arcu suscipit interdum. In sit amet ex quis eros hendrerit
              sollicitudin. Quisque mollis dignissim nisl ac venenatis. Ut nec
              nisl neque. Donec turpis sem, auctor quis nibh et, vehicula porta
              tortor.
            </p>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default RoomView;
