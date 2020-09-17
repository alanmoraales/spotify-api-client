import { useState, useEffect, useContext, FunctionComponent } from "react";
import { SpotifyContext } from "../SpotifyContext";
import { GridList } from "../GridList";
import { AlbumCard } from "../Cards";
import { CollectionTemplate } from "../templates";
import { CollectionContext } from "../CollectionContext";

const useUserAlbums = (initialState: any, params: Object | undefined) => {
  const [albums, setAlbums] = useState(initialState);
  const { spotify, loggedIn, fetchUserData } = useContext(SpotifyContext);

  const fetchAlbums = async () => {
    const albums = await fetchUserData(spotify.getMySavedAlbums, params);
    setAlbums(albums);
  };

  useEffect(() => {
    if (loggedIn) {
      fetchAlbums();
    }
  }, [loggedIn]);

  return [albums];
};

export const Albums: FunctionComponent = () => {
  const { state } = useContext(CollectionContext);
  const [albums] = useUserAlbums({ items: [] }, { limit: 30 });

  return state.onAlbumsPage ? (
    <CollectionTemplate title="Albums">
      <GridList>
        {albums.items.map((album: any) => (
          <AlbumCard album={album.album} key={album.album.uri} />
        ))}
      </GridList>
    </CollectionTemplate>
  ) : null;
};
