import { Response } from "express";
import jwt from "jsonwebtoken";

export const HASH_SALT = 10;

export const createAccessToken = (payload: any) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
    algorithm: "HS256",
  });
};

export const createRefreshToken = (payload: any) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
    algorithm: "HS256",
  });
};

export const createAndRefreshToken = (payload: any, res: Response) => {
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
  });

  return accessToken;
};
