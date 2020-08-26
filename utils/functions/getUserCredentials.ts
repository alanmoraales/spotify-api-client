import { IUserCredentials } from "../interfaces";

export const getUserCredentials = (data: any): IUserCredentials => {
  const accessToken = data.body["access_token"];
  const expireIn = data.body["expires_in"];
  const refreshToken = data.body["refresh_token"];

  return {
    accessToken,
    expireIn,
    refreshToken,
  };
};
