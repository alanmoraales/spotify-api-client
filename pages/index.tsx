import { useState, useEffect } from "react";
import Head from "next/head";
import SpotifyWebApi from "spotify-web-api-node";
import { IUserCredentials } from "../utils/interfaces";
import { NextPage } from "next";

interface IProps {
  code: string | string[] | undefined;
}

const Home: NextPage<IProps> = ({ code }) => {
  const [userData, setUserData] = useState({} as any);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setRefreshToken] = useState("");

  const spotify = new SpotifyWebApi();

  const fetchCredentials = (): Promise<IUserCredentials> =>
    fetch(`api/spotify/codeGrant?code=${code}`).then((data) => data.json());

  const updateUserData = (credentials: IUserCredentials) => {
    spotify.setAccessToken(credentials.accessToken);

    if (credentials.refreshToken) {
      spotify.setRefreshToken(credentials.refreshToken);
      setRefreshToken(credentials.refreshToken);
    }

    spotify.getMe().then((data: any) => {
      setUserData(data.body);
    });
  };

  const refreshToken = (): Promise<IUserCredentials> => {
    return fetch(
      `api/spotify/refreshToken?refreshToken=${token}`
    ).then((data) => data.json());
  };

  const updateCredentials = () => {
    refreshToken().then((newCredentials) => {
      updateUserData(newCredentials);
    });
  };

  useEffect(() => {
    if (code) {
      fetchCredentials().then((credentials) => {
        console.log(credentials);
        updateUserData(credentials);
        setLoggedIn(true);
      });
    }
  }, []);

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
            <button onClick={updateCredentials}>refresh</button>
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
            <button>log in</button>
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
