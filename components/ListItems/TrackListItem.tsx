import { FunctionComponent, useContext } from "react";
import { SpotifyContext } from "../SpotifyContext";
import { MediaListItem } from "./MediaListItem";

interface IProps {
  track: any;
}

export const TrackListItem: FunctionComponent<IProps> = ({ track }) => {
  const { play } = useContext(SpotifyContext);

  const action = () => {
    play([track.uri]);
  };

  return (
    <MediaListItem
      imageURL={track.album.images[2].url}
      title={track.name}
      subtitle={track.album.artists[0].name}
      action={action}
    />
  );
};
