import { useState, useEffect, useContext } from "react";
import { NextPage } from "next";
import { SpotifyContext } from "../../components/SpotifyContext";
import { makeStyles } from "@material-ui/core";
import { Section } from "../../components/Section";
import { AlbumCard } from "../../components/Cards";
import { useRouter } from "next/dist/client/router";

const useUserTracks = (initialState: any) => {
  const [albums, setAlbums] = useState(initialState);
  const { spotify, loggedIn, fetchUserData } = useContext(SpotifyContext);

  const fetchAlbums = async () => {
    const albums = await fetchUserData(spotify.getMySavedAlbums);
    setAlbums(albums);
  };

  useEffect(() => {
    if (loggedIn) {
      fetchAlbums();
    }
  }, [loggedIn]);

  return [albums];
};

const useStyles = makeStyles({
  container: {
    padding: "15px",
  },
});

const Albums: NextPage = () => {
  const { loggedIn } = useContext(SpotifyContext);
  const [albums] = useUserTracks({ items: [] });
  const router = useRouter();

  const classes = useStyles();

  useEffect(() => {
    if (!loggedIn) {
      router.push("/");
    }
  }, []);

  return (
    <div className={classes.container}>
      <Section name="Your Albums">
        {albums.items.map((album: any) => (
          <AlbumCard album={album.album} />
        ))}
      </Section>
    </div>
  );
};

export default Albums;
