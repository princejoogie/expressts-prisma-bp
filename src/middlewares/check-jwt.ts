import { RequestHandler } from "express";
import { verifyAccessToken } from "../utils/jwt-helper";
import { AppError } from "../utils/responses/error";

const checkJwt: RequestHandler = (req, _, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const error = new AppError("UnauthorizedException", "No token provided");
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  try {
    const { id } = verifyAccessToken(token);
    req.userId = id;
    return next();
  } catch (e: any) {
    const error = new AppError("UnauthorizedException", e.message);
    return next(error);
  }
};

export default checkJwt;
