import { RequestHandler } from "express";
import { REFRESH_TOKEN_KEY } from "../../utils/jwt-helper";
import { AppError } from "../../utils/responses/error";
import { SuccessType } from "../../utils/responses/types";

export interface LogoutResponse {
  success: boolean;
}

export const logoutController: RequestHandler<any, LogoutResponse> = async (
  _,
  res,
  next
) => {
  try {
    res.clearCookie(REFRESH_TOKEN_KEY);
    return res.status(SuccessType.OK).json({ success: true });
  } catch (e: any) {
    const error = new AppError("InternalServerErrorException", e.message);
    return next(error);
  }
};
