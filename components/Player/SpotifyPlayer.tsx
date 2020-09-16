import { FunctionComponent, useContext, useEffect, useState } from "react";
import { SpotifyContext } from "../SpotifyContext";
import Player from "./Player";

const useScript = (url: string) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  const handleError = () => {
    setScriptError(true);
  };

  const handleLoad = () => {
    setScriptLoaded(true);
  };

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    const script = document.createElement("script");
    script.src = url;
    script.async = true;

    script.onerror = handleError;
    script.onload = handleLoad;

    body.appendChild(script);
    return () => {
      body.removeChild(script);
    };
  }, []);

  return [scriptLoaded, scriptError];
};

const useSpotifyPlayer = () => {
  const [SDKloaded, SDKError] = useScript(
    "https://sdk.scdn.co/spotify-player.js"
  );
  const [state, setState] = useState<any>(undefined);
  const { accessToken, playerReady, setPlayerReady, setDeviceID } = useContext(
    SpotifyContext
  );

  useEffect(() => {
    // @ts-ignore
    window.onSpotifyWebPlaybackSDKReady = () => {
      // @ts-ignore
      const player = new Spotify.Player({
        name: "Spotify Client",
        getOAuthToken: (cb: any) => cb(accessToken),
      });

      player.addListener("player_state_changed", (state: any) => {
        setState(state);
      });

      player.addListener("ready", ({ device_id }: any) => {
        setDeviceID(device_id);
        setPlayerReady(true);
      });

      player.connect();
    };
  }, []);

  return [state, playerReady];
};

export const SpotifyPlayer: FunctionComponent = () => {
  const [state, playerReady] = useSpotifyPlayer();
  const [trackData, setTrackData] = useState<any>(undefined);

  useEffect(() => {
    if (state) {
      setTrackData({
        imageURL: state.track_window.current_track.album.images[0].url,
        trackName: state.track_window.current_track.name,
        trackArtist: state.track_window.current_track.artists[0].name,
      });
    } else {
      setTrackData(undefined);
    }
  }, [state]);

  return (
    <Player
      playerReady={playerReady}
      playing={trackData}
      imageURL={trackData ? trackData.imageURL : undefined}
      title={trackData ? trackData.trackName : undefined}
      description={trackData ? trackData.trackArtist : undefined}
    />
  );
};
