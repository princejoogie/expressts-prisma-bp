import { Response } from "express";
import jwt from "jsonwebtoken";

export interface TokenPayload {
  id: string;
}

export const HASH_SALT = 10;

export const REFRESH_TOKEN_KEY = "refreshToken";

export const isTokenValid = (token: string): boolean => {
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    return true;
  } catch (err) {
    return false;
  }
};

export const verifyRefreshToken = (refreshToken: string): TokenPayload => {
  return jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET!
  ) as TokenPayload;
};

export const createAccessToken = (payload: TokenPayload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15s",
    algorithm: "HS256",
  });
};

export const createRefreshToken = (payload: TokenPayload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
    algorithm: "HS256",
  });
};

export const createAndRefreshToken = (payload: TokenPayload, res: Response) => {
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  res.cookie(REFRESH_TOKEN_KEY, refreshToken, {
    httpOnly: true,
    sameSite: "lax",
  });

  return accessToken;
};
