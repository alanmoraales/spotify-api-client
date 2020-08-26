import Cors from "cors";
import runMiddleware from "../../../utils/functions/runMiddleware";
import SpotifyWebApi from "spotify-web-api-node";
import { NextApiRequest, NextApiResponse } from "next";

const spotify = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

const cors = Cors({
  methods: ["GET"],
});

interface IUserCredentials {
  accessToken: string;
  expireIn: number;
  refreshToken: string;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<IUserCredentials>
) => {
  await runMiddleware(req, res, cors);

  const code = req.query.code;
  const data = await spotify.authorizationCodeGrant(code);

  const accessToken = data.body["access_token"];
  const expireIn = data.body["expires_in"];
  const refreshToken = data.body["refresh_token"];

  res.status(200).json({
    accessToken,
    expireIn,
    refreshToken,
  });
};
