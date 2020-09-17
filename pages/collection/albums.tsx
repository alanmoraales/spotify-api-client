import { useState, useEffect, useContext } from "react";
import { NextPage } from "next";
import { SpotifyContext } from "../../components/SpotifyContext";
import { GridList } from "../../components/GridList";
import { AlbumCard } from "../../components/Cards";
import { CollectionTemplate } from "../../components/templates";

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

const Albums: NextPage = () => {
  const [albums] = useUserAlbums({ items: [] }, { limit: 30 });

  return (
    <CollectionTemplate title="Albums">
      <GridList>
        {albums.items.map((album: any) => (
          <AlbumCard album={album.album} key={album.album.uri} />
        ))}
      </GridList>
    </CollectionTemplate>
  );
};

export default Albums;
