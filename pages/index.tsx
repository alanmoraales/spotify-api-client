import { useState, useEffect, useContext } from "react";
import { SpotifyContext } from "../components/SpotifyContext";
import { NextPage } from "next";
import Button from "@material-ui/core/Button";
import { MediaCard } from "../components/MediaCard";

interface IProps {
  code: string | undefined;
}

const Home: NextPage<IProps> = ({ code }) => {
  const [userData, setUserData] = useState({
    display_name: "",
    product: "",
    email: "",
  });
  const { spotify, login, loggedIn, fetchUserData } = useContext(
    SpotifyContext
  );

  useEffect(() => {
    login(code);
  }, []);

  useEffect(() => {
    if (loggedIn) {
      updateData();
    }
  }, [loggedIn]);

  const updateData = async () => {
    const data = await fetchUserData(spotify.getMe);
    setUserData(data);
  };

  return (
    <main>
      {loggedIn ? (
        <div>
          <h3>Loged in</h3>
          <Button variant="contained" onClick={updateData}>
            refresh
          </Button>
          <hr />
          <div>
            <h1>{userData.display_name}</h1>
            <p>{userData.product}</p>
            <p>{userData.email}</p>
            <hr />
          </div>
          <MediaCard />
        </div>
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
