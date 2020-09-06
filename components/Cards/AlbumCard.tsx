import { FunctionComponent } from "react";
import MediaCard from "./MediaCard";

interface IProps {
  album: any;
}

export const AlbumCard: FunctionComponent<IProps> = ({ album }) => {
  const action = () => {
    alert(`Reproduciendo: ${album.uri}`);
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
