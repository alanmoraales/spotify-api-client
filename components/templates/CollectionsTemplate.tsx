import { FunctionComponent } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import { SpotifyPlayer } from "../Player";
import { CollectionNav } from "../Navs";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      padding: "15px",
    },
    nav: {
      display: "flex",
      gap: "15px",
      height: "60px",
      alignItems: "center",
      position: "sticky",
      top: "0px",
      zIndex: 5,
      backgroundColor: theme.palette.background.default,
    },
  })
);

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
        <CollectionNav initialPage="playlists" />
        {children}
      </div>
      <SpotifyPlayer />
    </>
  );
};
