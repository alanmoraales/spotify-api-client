import { useContext, useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { SpotifyContext } from "../SpotifyContext";

export const Player = () => {
  const { accessToken, currentTrack } = useContext(SpotifyContext);

  return currentTrack ? (
    <SpotifyPlayer
      token={accessToken}
      uris={currentTrack}
      showSaveIcon={false}
      autoPlay={true}
    />
  ) : null;
};
