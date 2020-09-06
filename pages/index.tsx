import { useState, useEffect, useContext } from "react";
import { SpotifyContext } from "../components/SpotifyContext";
import { NextPage } from "next";
import Button from "@material-ui/core/Button";
import { Section } from "../components/Section";
import { Player } from "../components/Player";

interface IProps {
  code: string | undefined;
}

const useUserTracks = (initialState: any) => {
  const [tracks, setTracks] = useState(initialState);
  const { spotify, loggedIn, fetchUserData } = useContext(SpotifyContext);

  const fetchTracks = async () => {
    const tracks = await fetchUserData(spotify.getUserPlaylists);
    setTracks(tracks);
  };

  useEffect(() => {
    if (loggedIn) {
      fetchTracks();
    }
  }, [loggedIn]);

  return [tracks];
};

const Home: NextPage<IProps> = ({ code }) => {
  const { login, loggedIn } = useContext(SpotifyContext);
  const [tracks] = useUserTracks({});

  useEffect(() => {
    login(code);
  }, []);

  return (
    <main>
      {loggedIn ? (
        <>
          <Section
            name="Your Music"
            tracks={tracks.items ? tracks.items : []}
          />
          <Player />
        </>
      ) : (
        <a href="api/spotify/login">
          <Button variant="contained">log in</Button>
        </a>
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
