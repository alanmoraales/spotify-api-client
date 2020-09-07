import { useState, useEffect, useContext } from "react";
import { NextPage } from "next";
import { SpotifyContext } from "../../components/SpotifyContext";
import { makeStyles, Typography } from "@material-ui/core";
import { GridList } from "../../components/GridList";
import { AlbumCard } from "../../components/Cards";
import { useRouter } from "next/dist/client/router";

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

const useStyles = makeStyles({
  container: {
    padding: "15px",
  },
  title: {
    paddingTop: "30px",
    paddingBottom: "15px",
  },
});

const Albums: NextPage = () => {
  const { loggedIn } = useContext(SpotifyContext);
  const [albums] = useUserAlbums({ items: [] }, { limit: 2 });
  const router = useRouter();

  const classes = useStyles();

  useEffect(() => {
    if (!loggedIn) {
      router.push("/");
    }
  }, []);

  return (
    <div className={classes.container}>
      <Typography variant="h5" className={classes.title}>
        Albums
      </Typography>
      <GridList>
        {albums.items.map((album: any) => (
          <AlbumCard album={album.album} key={album.album.uri} />
        ))}
      </GridList>
    </div>
  );
};

export default Albums;
