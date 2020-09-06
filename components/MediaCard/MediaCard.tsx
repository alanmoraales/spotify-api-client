import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { FunctionComponent } from "react";

const useStyles = makeStyles({
  root: {
    boxSizing: "border-box",
    width: 200,
    height: "100%",
  },
  media: {
    height: 200,
  },
});

interface IProps {
  track: any;
}

export const MediaCard: FunctionComponent<IProps> = ({ track }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={track.album.images[0].url}
          title="Song Cover"
        />
        <CardContent>
          <Typography variant="h6" component="h2">
            {track.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {track.artists[0].name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
