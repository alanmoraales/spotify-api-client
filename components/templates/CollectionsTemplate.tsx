import { FunctionComponent } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import { SpotifyPlayer } from "../Player";
import { CollectionNav } from "../Navs";
import { CollectionContextProvider } from "../CollectionContext";

const useStyles = makeStyles((theme) =>
  createStyles({
    main: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
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
    <CollectionContextProvider>
      <div className={classes.main}>
        <CollectionNav />
        {children}
      </div>
      <SpotifyPlayer />
    </CollectionContextProvider>
  );
};
