import { IUserCredentials } from "../interfaces";

export const getUserCredentials = (data: any): IUserCredentials => {
  const accessToken = data["access_token"];
  const expireIn = data["expires_in"];
  const refreshToken = data["refresh_token"];

  return {
    accessToken,
    expireIn,
    refreshToken,
  };
};
