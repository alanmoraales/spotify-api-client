import Cors from "cors";
import SpotifyWebApi from "spotify-web-api-node";
import { NextApiRequest, NextApiResponse } from "next";
import { runMiddleware, getUserCredentials } from "../../../utils/functions";
import { IUserCredentials } from "../../../utils/interfaces";

const spotify = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

const cors = Cors({
  methods: ["GET"],
});

export default async (
  req: NextApiRequest,
  res: NextApiResponse<IUserCredentials>
) => {
  await runMiddleware(req, res, cors);
  const refresh_token = req.body.refreshToken;
  const data = await spotify.refreshAccessToken(refresh_token);

  res.status(200).json(getUserCredentials(data.body));
};
