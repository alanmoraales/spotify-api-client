import { FunctionComponent, ReactNode, Dispatch, SetStateAction } from "react";
import { Context } from "react";
import { createContext, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { IUserCredentials } from "../../utils/interfaces";
// getMyCurrentPlaybackState
interface ISpotifyContext {
  spotify: any;
  accessToken: string;
  login: (authorizationCode: string | undefined) => Promise<void>;
  loggedIn: boolean;
  fetchUserData: (method: Function, params: Object | undefined) => Promise<any>;
  setDeviceID: Dispatch<SetStateAction<string | undefined>>;
  playerReady: boolean;
  setPlayerReady: Dispatch<SetStateAction<boolean>>;
  play: (uri: string | string[]) => void;
}

export const SpotifyContext: Context<ISpotifyContext> = createContext(
  {} as ISpotifyContext
);

export const SpotifyProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [refreshToken, setRefreshToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [deviceID, setDeviceID] = useState<undefined | string>(undefined);
  const [playerReady, setPlayerReady] = useState(false);
  const spotify = new SpotifyWebApi();

  const fetchCredentials = async (code: string): Promise<IUserCredentials> => {
    const credentials = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/spotify/codeGrant?code=${code}`
    );
    const credentialsJSON = await credentials.json();
    return credentialsJSON;
  };

  const refreshCredentials = async (
    refreshToken: string
  ): Promise<IUserCredentials> => {
    const credentials = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/spotify/refreshToken?refreshToken=${refreshToken}`
    );
    const credentialsJSON = await credentials.json();
    return credentialsJSON;
  };

  const setUserCredentials = (credentials: IUserCredentials) => {
    spotify.setAccessToken(credentials.accessToken);
    setAccessToken(credentials.accessToken);

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

  const fetchUserData = async (
    _method: Function,
    params: Object | undefined
  ) => {
    const credentials = await refreshCredentials(refreshToken);
    setUserCredentials(credentials);
    const method = _method.bind(spotify);

    let data: any;
    if (params) {
      data = await method(params);
    } else {
      data = await method();
    }
    return data.body;
  };

  const play = async (uri: string | string[]) => {
    const credentials = await refreshCredentials(refreshToken);
    setUserCredentials(credentials);

    let body: any;

    if (typeof uri === "string") {
      body = {
        context_uri: uri,
      };
    } else {
      body = {
        uris: uri,
      };
    }

    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.accessToken}`,
      },
      method: "PUT",
      body: JSON.stringify(body),
    });
  };

  const value = {
    spotify,
    accessToken,
    login,
    loggedIn,
    fetchUserData,
    setDeviceID,
    playerReady,
    setPlayerReady,
    play,
  };

  return (
    <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>
  );
};
