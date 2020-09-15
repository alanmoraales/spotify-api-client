import { FunctionComponent } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {
  playerReady: boolean;
  playing: any;
  imageURL: string;
  title: string;
  description: string;
}

const useStyles = makeStyles({
  player: {
    display: "flex",
    width: "100%",
    height: "80px",
    position: "sticky",
    bottom: "0px",
    padding: "10px",
    borderTop: "3px solid white",
  },
  cover: {
    height: "100%",
    width: "auto",
  },
  text: {
    maxHeight: "1.5em",
    overflow: "hidden",
    textAlign: "left",
  },
  content: {
    padding: "0px",
    paddingLeft: "10px",
  },
});

const Player: FunctionComponent<IProps> = ({
  playerReady,
  playing,
  imageURL,
  title,
  description,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.player}>
      {playerReady ? (
        <>
          {playing ? (
            <>
              <CardMedia
                className={classes.cover}
                image={imageURL}
                title={title}
                component="img"
              />
              <CardContent className={classes.content}>
                <Typography
                  className={classes.text}
                  variant="subtitle1"
                  component="h6"
                >
                  {title}
                </Typography>
                <Typography
                  className={classes.text}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  {description}
                </Typography>
              </CardContent>
            </>
          ) : (
            <Typography
              className={classes.text}
              variant="subtitle1"
              component="h6"
            >
              Nothing playing here
            </Typography>
          )}
        </>
      ) : (
        <Typography className={classes.text} variant="subtitle1" component="h6">
          Loading player...
        </Typography>
      )}
    </Card>
  );
};

export default Player;
