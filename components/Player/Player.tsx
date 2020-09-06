import { useContext, useEffect, useState } from "react";
import SpotifyWebPlayer from "react-spotify-web-playback";
import { SpotifyContext } from "../SpotifyContext";

export const Player = () => {
  const { accessToken, currentTrack } = useContext(SpotifyContext);

  return currentTrack ? (
    <SpotifyWebPlayer
      token={accessToken}
      uris={currentTrack}
      showSaveIcon={false}
      autoPlay={true}
    />
  ) : null;
};
