import { RequestHandler } from "express";
import { REFRESH_TOKEN_KEY } from "../../utils/jwt-helper";
import { SuccessType } from "../../utils/responses/types";

export const logoutController: RequestHandler = async (_, res) => {
  res.clearCookie(REFRESH_TOKEN_KEY);
  return res.status(SuccessType.OK).json({ success: true });
};
