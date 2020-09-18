import { useEffect, useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { SpotifyContext } from "../components/SpotifyContext";

interface IProps {
  code: string | undefined;
}

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
  },
  login: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
});

const Home: NextPage<IProps> = ({ code }) => {
  const { login, loggedIn } = useContext(SpotifyContext);
  const router = useRouter();

  const classes = useStyles();

  useEffect(() => {
    if (loggedIn) {
      router.push("/collections");
    }
  }, [loggedIn]);

  useEffect(() => {
    login(code);
  }, []);

  return (
    <main>
      <div className={classes.login}>
        <a className={classes.link} href="api/spotify/login">
          <Button variant="contained" color="secondary">
            log in
          </Button>
        </a>
      </div>
    </main>
  );
};

Home.getInitialProps = async (context) => {
  let code = context.query.code;

  if (code instanceof Array) {
    code = undefined;
  }
  return {
    code,
  };
};

export default Home;
