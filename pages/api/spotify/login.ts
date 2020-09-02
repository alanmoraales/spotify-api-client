import { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";
import Cors from "cors";
import { runMiddleware } from "../../../utils/functions";

const scopes = ["user-read-private", "user-read-email", "user-library-read"];
const state = "loginin";

const spotify = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

const cors = Cors({
  methods: ["GET"],
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors);
  const authorizeURL = spotify.createAuthorizeURL(scopes, state);
  res.redirect(authorizeURL);
};
