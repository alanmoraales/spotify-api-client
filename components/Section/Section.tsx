import { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import { MediaCard } from "../MediaCard";

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
      <h3>{name}</h3>
      <GridList className={classes.list}>
        {tracks.map((item) => (
          <MediaCard key={item.id} track={item} className={classes.card} />
        ))}
      </GridList>
    </>
  );
};
