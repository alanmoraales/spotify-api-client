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
    width: "100%",
    height: "auto",
    padding: 15,
  },
  media: {
    width: "100%",
    height: "100%",
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
    <CardActionArea className={classes.actionArea} onClick={() => action()}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
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
      </Card>
    </CardActionArea>
  );
};

export default MediaCard;
