import { FunctionComponent, ReactNode } from "react";
import { Context } from "react";
import { createContext, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { IUserCredentials } from "../../utils/interfaces";

interface ISpotifyContext {
  spotify: any;
  login: (authorizationCode: string | undefined) => Promise<void>;
  loggedIn: boolean;
  fetchUserData: (method: Function) => Promise<any>;
}

export const SpotifyContext: Context<ISpotifyContext> = createContext(
  {} as ISpotifyContext
);

export const SpotifyProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [refreshToken, setRefreshToken] = useState("");
  const spotify = new SpotifyWebApi();

  const fetchCredentials = async (code: string): Promise<IUserCredentials> => {
    const credentials = await fetch(`api/spotify/codeGrant?code=${code}`);
    const credentialsJSON = await credentials.json();
    return credentialsJSON;
  };

  const refreshCredentials = async (
    refreshToken: string
  ): Promise<IUserCredentials> => {
    const credentials = await fetch(
      `api/spotify/refreshToken?refreshToken=${refreshToken}`
    );
    const credentialsJSON = await credentials.json();
    return credentialsJSON;
  };

  const setUserCredentials = (credentials: IUserCredentials) => {
    spotify.setAccessToken(credentials.accessToken);

    if (credentials.refreshToken) {
      setRefreshToken(credentials.refreshToken);
    }

    sessionStorage.setItem(
      "user-credentials",
      JSON.stringify({
        accessToken: credentials.accessToken,
        expireIn: credentials.expireIn,
        refreshToken: credentials.refreshToken
          ? credentials.refreshToken
          : refreshToken,
      })
    );
  };

  const login = async (authorizationCode: string | undefined) => {
    let credentialsFromLocal = sessionStorage.getItem("user-credentials");
    let credentials: IUserCredentials;

    if (credentialsFromLocal) {
      credentials = JSON.parse(credentialsFromLocal);
    } else {
      if (!authorizationCode) {
        setLoggedIn(false);
        return;
      }
      credentials = await fetchCredentials(authorizationCode);
    }

    setUserCredentials(credentials);
    setLoggedIn(true);
  };

  const fetchUserData = async (_method: Function) => {
    const credentials = await refreshCredentials(refreshToken);
    setUserCredentials(credentials);
    const method = _method.bind(spotify);
    const data = await method();
    return data.body;
  };

  const value = {
    spotify,
    login,
    loggedIn,
    fetchUserData,
  };

  return (
    <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>
  );
};
