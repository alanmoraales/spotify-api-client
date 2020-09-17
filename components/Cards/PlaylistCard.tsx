import { FunctionComponent, useContext } from "react";
import { SpotifyContext } from "../SpotifyContext";
import MediaCard from "./MediaCard";

interface IProps {
  playlist: any;
}

export const PlaylistCard: FunctionComponent<IProps> = ({ playlist }) => {
  const { play } = useContext(SpotifyContext);

  const action = () => {
    play(playlist.uri);
  };

  return (
    <MediaCard
      imageURL={playlist.images[0].url}
      title={playlist.name}
      description={playlist.owner.display_name}
      action={action}
    />
  );
};
