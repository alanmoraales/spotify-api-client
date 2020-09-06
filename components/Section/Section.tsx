import { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import { MediaCard } from "../MediaCard";
import Typography from "@material-ui/core/Typography";

interface IProps {
  name: string;
  tracks: any[];
}

const useStyles = makeStyles({
  list: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  card: {
    margin: "10px",
  },
});
export const Section: FunctionComponent<IProps> = ({ name, tracks }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4">{name}</Typography>
      <hr />
      <GridList className={classes.list}>
        {tracks.map((item) => (
          <MediaCard key={item.id} track={item} className={classes.card} />
        ))}
      </GridList>
    </>
  );
};
