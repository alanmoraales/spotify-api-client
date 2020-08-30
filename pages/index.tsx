import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { SpotifyContext } from "../components/SpotifyContext";
import { NextPage } from "next";
import Button from "@material-ui/core/Button";

interface IProps {
  code: string | string[] | undefined;
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
    if (code) {
      login(code as string);
    }
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
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
          </div>
        ) : (
          <a href="api/spotify/login">
            <Button variant="contained">log in</Button>
          </a>
        )}
      </main>
    </div>
  );
};

Home.getInitialProps = async (context) => {
  return {
    code: context.query.code,
  };
};

export default Home;
