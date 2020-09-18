import { NextPage } from "next";
import { Albums, Playlists, Tracks } from "../components/Pages";
import { CollectionsTemplate } from "../components/templates";

const Collections: NextPage = () => {
  return (
    <CollectionsTemplate>
      <Albums />
      <Playlists />
      <Tracks />
    </CollectionsTemplate>
  );
};

export default Collections;
