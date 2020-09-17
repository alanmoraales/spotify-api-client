import { useEffect, useContext } from "react";
import { SpotifyContext } from "../../components/SpotifyContext";
import { makeStyles, Typography } from "@material-ui/core";
import { CollectionsTemplate } from "./CollectionsTemplate";
import { useRouter } from "next/dist/client/router";
import { FunctionComponent } from "react";

const useStyles = makeStyles({
  title: {
    paddingTop: "30px",
    paddingBottom: "15px",
  },
});

interface IProps {
  title: string;
  children: any;
}

export const CollectionTemplate: FunctionComponent<IProps> = ({
  title,
  children,
}) => {
  const { loggedIn } = useContext(SpotifyContext);
  const router = useRouter();

  const classes = useStyles();

  useEffect(() => {
    if (!loggedIn) {
      router.push("/");
    }
  }, []);

  return (
    <CollectionsTemplate>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
        {children}
    </CollectionsTemplate>
  );
};
