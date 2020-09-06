import { useState, useEffect, useContext } from "react";
import { SpotifyContext } from "../components/SpotifyContext";
import { NextPage } from "next";
import Button from "@material-ui/core/Button";
import { Section } from "../components/Section";
import { makeStyles } from "@material-ui/core";

interface IProps {
  code: string | undefined;
}

const useUserTracks = (initialState: any) => {
  const [tracks, setTracks] = useState(initialState);
  const { spotify, loggedIn, fetchUserData } = useContext(SpotifyContext);

  const fetchTracks = async () => {
    const tracks = await fetchUserData(spotify.getMySavedTracks);
    console.log(tracks);
    setTracks(tracks);
  };

  useEffect(() => {
    if (loggedIn) {
      fetchTracks();
    }
  }, [loggedIn]);

  return [tracks];
};

const useStyles = makeStyles((theme: any) => ({
  background: {
    backgroundColor: theme.palette.background.default,
  },
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
}));

const Home: NextPage<IProps> = ({ code }) => {
  const { login, loggedIn } = useContext(SpotifyContext);
  const [tracks] = useUserTracks({});

  const classes = useStyles();

  useEffect(() => {
    login(code);
  }, []);

  return (
    <main className={classes.background}>
      {loggedIn ? (
        <Section name="Your Music" tracks={tracks.items ? tracks.items : []} />
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
