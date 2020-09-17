import { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core";
import { SpotifyPlayer } from "../Player";

const useStyles = makeStyles({
  container: {
    padding: "15px",
  },
});

interface IProps {
  children: any;
}

export const CollectionsTemplate: FunctionComponent<IProps> = ({
  children,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <p>here goes something else</p>
        {children}
      </div>
      <SpotifyPlayer />
    </>
  );
};
