import { FunctionComponent, useContext, useEffect, useState } from "react";
import { CollectionContext } from "../CollectionContext";
import { FlexList } from "../FlexList";
import { TrackListItem } from "../ListItems/TrackListItem";
import { SpotifyContext } from "../SpotifyContext";
import { CollectionTemplate } from "../templates";

const useUserTracks = (initialState: any, params: Object | undefined) => {
  const [tracks, setTracks] = useState(initialState);
  const { spotify, loggedIn, fetchUserData } = useContext(SpotifyContext);

  const fetchTracks = async () => {
    const tracks = await fetchUserData(spotify.getMySavedTracks, params);
    setTracks(tracks);
  };

  useEffect(() => {
    if (loggedIn) {
      fetchTracks();
    }
  }, [loggedIn]);

  return [tracks];
};

export const Tracks: FunctionComponent = () => {
  const [tracks] = useUserTracks({ items: [] }, { limit: 40 });
  const { state } = useContext(CollectionContext);

  return state.onTracksPage ? (
    <CollectionTemplate title="Your Saved Tracks">
      <FlexList>
        {tracks.items.map((item: any) => (
          <TrackListItem track={item.track} key={item.track.id} />
        ))}
      </FlexList>
    </CollectionTemplate>
  ) : null;
};
