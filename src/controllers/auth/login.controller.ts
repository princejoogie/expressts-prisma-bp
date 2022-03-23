import bcrypt from "bcryptjs";
import { RequestHandler } from "express";

import { LoginBody } from "../../dtos";
import { AppError } from "../../utils/responses/error";
import prisma from "../../lib/prisma";
import { createAndRefreshToken } from "../../utils/jwt-helper";

export const loginController: RequestHandler<any, any, LoginBody> = async (
  req,
  res,
  next
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Check if user exists
    if (!user) {
      const error = new AppError("NotFoundException", "User not found");
      return next(error);
    }

    const isValid = await bcrypt.compare(password, user.password);

    // validate password
    if (!isValid) {
      const error = new AppError(
        "UnauthorizedException",
        "Invalid credentials"
      );
      return next(error);
    }

    const token = createAndRefreshToken({ id: user.id }, res);
    return res.json({ token });
  } catch (e: any) {
    const error = new AppError("InternalServerErrorException", e.message);
    return next(error);
  }
};
