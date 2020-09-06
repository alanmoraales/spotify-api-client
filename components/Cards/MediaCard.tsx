import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { FunctionComponent } from "react";

const useStyles = makeStyles({
  root: {
    width: 200,
    height: "100%",
  },
  media: {
    height: 200,
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
    <Card className={classes.root}>
      <CardActionArea onClick={() => action()}>
        <CardMedia className={classes.media} image={imageURL} title={title} />
        <CardContent>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MediaCard;
