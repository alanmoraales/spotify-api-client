import { FunctionComponent, useContext } from "react";
import { CollectionContext } from "../CollectionContext";
import { CollectionTemplate } from "../templates";

export const Tracks: FunctionComponent = () => {
  const { state } = useContext(CollectionContext);

  return state.onTracksPage ? (
    <CollectionTemplate title="Your Saved Tracks">tracks</CollectionTemplate>
  ) : null;
};
