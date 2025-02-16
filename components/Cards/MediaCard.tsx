import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { FunctionComponent } from "react";

const useStyles = makeStyles({
  actionArea: {
    width: "100%",
    height: "auto",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: 15,
  },
  mediaContainer: {
    width: "100%",
    position: "relative",
    paddingBottom: "100%",
    backgroundColor: "#333",
  },
  media: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0px",
    left: "0px",
  },
  text: {
    maxHeight: "1.5em",
    overflow: "hidden",
    textAlign: "left",
  },
  content: {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

interface IProps {
  imageURL: string;
  title: string;
  description: string;
  action: Function;
}

const MediaCard: FunctionComponent<IProps> = ({
  imageURL,
  title,
  description,
  action,
}) => {
  const classes = useStyles();

  return (
    <CardActionArea onClick={() => action()}>
      <Card className={classes.root}>
        <div className={classes.mediaContainer}>
          <CardMedia
            className={classes.media}
            image={imageURL}
            title={title}
            component="img"
          />
        </div>
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
      </Card>
    </CardActionArea>
  );
};

export default MediaCard;
