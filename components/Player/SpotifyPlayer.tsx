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
  const [spotifyPlayer, setSpotifyPlayer] = useState<any>(undefined);
  const [playerStatus, setPlayerStatus] = useState<String>("notReady");
  const { accessToken } = useContext(SpotifyContext);

  useEffect(() => {
    // @ts-ignore
    window.onSpotifyWebPlaybackSDKReady = () => {
      // @ts-ignore
      const player = new Spotify.Player({
        name: "Spotify Client",
        getOAuthToken: (cb: any) => cb(accessToken),
      });

      // Error handling
      player.addListener("initialization_error", ({ message }: any) => {
        console.error(message);
      });
      player.addListener("authentication_error", ({ message }: any) => {
        console.error(message);
      });
      player.addListener("account_error", ({ message }: any) => {
        console.error(message);
      });
      player.addListener("playback_error", ({ message }: any) => {
        console.error(message);
      });

      // Playback status updates
      player.addListener("player_state_changed", (state: any) => {
        console.log(state);
      });

      // Ready
      player.addListener("ready", ({ device_id }: any) => {
        console.log("Ready with Device ID", device_id);
        setPlayerStatus("ready");
      });

      // Not Ready
      player.addListener("not_ready", ({ device_id }: any) => {
        console.log("Device ID has gone offline", device_id);
      });

      // Connect to the player!
      player.connect();
      setSpotifyPlayer(player);
    };
  }, []);

  return [spotifyPlayer, playerStatus];
};

export const SpotifyPlayer: FunctionComponent = () => {
  const [player, playerStatus] = useSpotifyPlayer();

  return playerStatus === "ready" ? <Player /> : <p>loading player</p>;
};
