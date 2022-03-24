import { RequestHandler } from "express";
import { isTokenValid } from "../utils/jwt-helper";
import { AppError } from "../utils/responses/error";

const checkJwt: RequestHandler = (req, _, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const error = new AppError("UnauthorizedException", "No token provided");
    return next(error);
  }

  const token = authHeader.split(" ")[1];
  if (!isTokenValid(token)) {
    const error = new AppError("UnauthorizedException", "Invalid token");
    return next(error);
  }

  return next();
};

export default checkJwt;
