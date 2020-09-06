import { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import { MediaCard } from "../Cards";
import { GridListTile, Typography } from "@material-ui/core";

interface IProps {
  name: string;
  tracks: any[];
}

const useStyles = makeStyles({
  root: {
    justifyContent: "space-evenly",
  },
  title: {
    padding: "15px",
  },
});
export const Section: FunctionComponent<IProps> = ({ name, tracks }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4" className={classes.title}>
        {name}
      </Typography>
      <GridList
        className={classes.root}
        cellHeight="auto"
        cols={5}
        spacing={10}
        style={{ margin: 0 }}
      >
        {tracks.map((item) => (
          <GridListTile key={item.track.id}>
            <MediaCard track={item.track} />
          </GridListTile>
        ))}
      </GridList>
    </>
  );
};
