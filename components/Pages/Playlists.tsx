import { FunctionComponent, useContext, useState, useEffect } from "react";
import { PlaylistCard } from "../Cards";
import { CollectionContext } from "../CollectionContext";
import { GridList } from "../GridList";
import { SpotifyContext } from "../SpotifyContext";
import { CollectionTemplate } from "../templates";

const useUserPlaylists = (initialState: any, params: Object | undefined) => {
  const [playlists, setPlaylists] = useState(initialState);
  const { spotify, loggedIn, fetchUserData } = useContext(SpotifyContext);

  const fetchPlaylists = async () => {
    const playlists = await fetchUserData(spotify.getUserPlaylists, params);
    console.log(playlists);
    setPlaylists(playlists);
  };

  useEffect(() => {
    if (loggedIn) {
      fetchPlaylists();
    }
  }, [loggedIn]);

  return [playlists];
};

export const Playlists: FunctionComponent = () => {
  const [playlists] = useUserPlaylists({ items: [] }, { limit: 30 });
  const { state } = useContext(CollectionContext);

  return state.onPlaylistsPage ? (
    <CollectionTemplate title="Playlists">
      <GridList>
        {playlists.items.map((playlist: any) => (
          <PlaylistCard playlist={playlist} key={playlist.id} />
        ))}
      </GridList>
    </CollectionTemplate>
  ) : null;
};
