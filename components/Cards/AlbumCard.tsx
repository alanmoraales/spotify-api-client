import { FunctionComponent, useContext } from "react";
import { SpotifyContext } from "../SpotifyContext";
import MediaCard from "./MediaCard";

interface IProps {
  album: any;
}

export const AlbumCard: FunctionComponent<IProps> = ({ album }) => {
  const { play } = useContext(SpotifyContext);

  const action = () => {
    play(album.uri);
  };

  return (
    <MediaCard
      imageURL={album.images[0].url}
      title={album.name}
      description={album.artists[0].name}
      action={action}
    />
  );
};
