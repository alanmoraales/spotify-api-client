import { FunctionComponent, useContext } from "react";
import { CollectionContext } from "../CollectionContext";
import { CollectionTemplate } from "../templates";

export const Playlists: FunctionComponent = () => {
  const { state } = useContext(CollectionContext);

  return state.onPlaylistsPage ? (
    <CollectionTemplate title="Playlists">playlists</CollectionTemplate>
  ) : null;
};
