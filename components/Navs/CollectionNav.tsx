import { makeStyles, createStyles } from "@material-ui/core";
import { FunctionComponent, useContext } from "react";
import { NavButton } from "../Buttons";
import { CollectionContext } from "../CollectionContext";

const useStyles = makeStyles((theme) =>
  createStyles({
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

export const CollectionNav: FunctionComponent = () => {
  const { state, dispatch } = useContext(CollectionContext);
  const { onPlaylistsPage, onTracksPage, onAlbumsPage } = state;
  const classes = useStyles();

  return (
    <nav className={classes.nav}>
      <NavButton
        active={onPlaylistsPage}
        onClick={() => dispatch({ type: "playlists" })}
      >
        Playlists
      </NavButton>
      <NavButton
        active={onTracksPage}
        onClick={() => dispatch({ type: "tracks" })}
      >
        Tracks
      </NavButton>
      <NavButton
        active={onAlbumsPage}
        onClick={() => dispatch({ type: "albums" })}
      >
        Albums
      </NavButton>
    </nav>
  );
};
