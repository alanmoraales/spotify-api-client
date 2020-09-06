import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { FunctionComponent, useContext } from "react";
import { SpotifyContext } from "../SpotifyContext";

const useStyles = makeStyles({
  root: {
    width: 200,
  },
  media: {
    minHeight: 200,
    width: 200,
  },
});

interface IProps {
  track: any;
}

export const MediaCard: FunctionComponent<IProps> = ({ track }) => {
  const classes = useStyles();
  const { playTrack } = useContext(SpotifyContext);

  const onClick = () => {
    playTrack(track.uri);
  };

  return (
    <Card onClick={onClick} className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={track.images[0].url}
          title="Song Cover"
        />
        <CardContent>
          <Typography variant="h6" component="h2">
            {track.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {track.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
