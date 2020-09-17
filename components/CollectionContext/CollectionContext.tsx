import {
  createContext,
  useReducer,
  Context,
  FunctionComponent,
  ReactNode,
  Dispatch,
} from "react";

interface ICollectionContext {
  state: State;
  dispatch: Dispatch<Action>;
}

export const CollectionContext: Context<ICollectionContext> = createContext(
  {} as ICollectionContext
);

interface State {
  onPlaylistsPage: boolean;
  onTracksPage: boolean;
  onAlbumsPage: boolean;
}

interface Action {
  type: "playlists" | "tracks" | "albums";
}

const switchPage = (state: State, action: Action): State => {
  switch (action.type) {
    case "playlists":
      return {
        onPlaylistsPage: true,
        onTracksPage: false,
        onAlbumsPage: false,
      };
    case "tracks":
      return {
        onPlaylistsPage: false,
        onTracksPage: true,
        onAlbumsPage: false,
      };
    case "albums":
      return {
        onPlaylistsPage: false,
        onTracksPage: false,
        onAlbumsPage: true,
      };
  }
};

export const CollectionContextProvider: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(switchPage, {
    onPlaylistsPage: true,
    onTracksPage: false,
    onAlbumsPage: false,
  });

  const value = {
    state: state,
    dispatch: dispatch,
  };

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
};
