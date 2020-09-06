import { useState, useEffect, useContext } from "react";
import { SpotifyContext } from "../components/SpotifyContext";
import { NextPage } from "next";
import Button from "@material-ui/core/Button";
import { Section } from "../components/Section";
import { makeStyles } from "@material-ui/core";
import { AlbumCard } from "../components/Cards";

interface IProps {
  code: string | undefined;
}

const useUserTracks = (initialState: any) => {
  const [albums, setAlbums] = useState(initialState);
  const { spotify, loggedIn, fetchUserData } = useContext(SpotifyContext);

  const fetchAlbums = async () => {
    const albums = await fetchUserData(spotify.getMySavedAlbums);
    setAlbums(albums);
  };

  useEffect(() => {
    if (loggedIn) {
      fetchAlbums();
    }
  }, [loggedIn]);

  return [albums];
};

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
  },
  login: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  container: {
    padding: "15px",
  },
});

const Home: NextPage<IProps> = ({ code }) => {
  const { login, loggedIn } = useContext(SpotifyContext);
  const [albums] = useUserTracks({ items: [] });

  const classes = useStyles();

  useEffect(() => {
    login(code);
  }, []);

  return (
    <main>
      {loggedIn ? (
        <div className={classes.container}>
          <Section name="Your Albums">
            {albums.items.map((album: any) => (
              <AlbumCard album={album.album} />
            ))}
          </Section>
        </div>
      ) : (
        <div className={classes.login}>
          <a className={classes.link} href="api/spotify/login">
            <Button variant="contained" color="secondary">
              log in
            </Button>
          </a>
        </div>
      )}
    </main>
  );
};

Home.getInitialProps = async (context) => {
  let code = context.query.code;

  if (code instanceof Array) {
    code = undefined;
  }
  return {
    code,
  };
};

export default Home;
