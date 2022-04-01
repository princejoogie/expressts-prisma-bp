import bcrypt from "bcryptjs";
import { RequestHandler } from "express";

import prisma from "../../lib/prisma";
import { AppError } from "../../utils/responses/error";
import { LoginBody } from "../../dtos";
import { SuccessType } from "../../utils/responses/types";
import { createAndRefreshToken } from "../../utils/jwt-helper";

export const loginController: RequestHandler<any, any, LoginBody> = async (
  req,
  res,
  next
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      const error = new AppError("NotFoundException", "User not found");
      return next(error);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      const error = new AppError(
        "UnauthorizedException",
        "Invalid credentials"
      );
      return next(error);
    }

    const accessToken = createAndRefreshToken({ id: user.id }, res);
    return res.status(SuccessType.OK).json({ accessToken });
  } catch (e: any) {
    const error = new AppError("InternalServerErrorException", e.message);
    return next(error);
  }
};
