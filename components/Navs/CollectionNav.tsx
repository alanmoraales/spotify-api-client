import { makeStyles, createStyles } from "@material-ui/core";
import { FunctionComponent } from "react";
import { NavButton } from "../Buttons";

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

interface IProps {
  initialPage: string;
}

export const CollectionNav: FunctionComponent<IProps> = ({ initialPage }) => {
  const classes = useStyles();

  return (
    <nav className={classes.nav}>
      <NavButton href="/colletion/playlists">Playlists</NavButton>
      <NavButton href="/colletion/tracks">Tracks</NavButton>
      <NavButton href="/colletion/albums" active={true}>
        Albums
      </NavButton>
    </nav>
  );
};
