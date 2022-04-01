import bcrypt from "bcryptjs";
import { RequestHandler } from "express";

import prisma from "../../lib/prisma";
import { AppError } from "../../utils/responses/error";
import { LoginBody } from "../../dtos";
import { SuccessType } from "../../utils/responses/types";
import { createAndRefreshToken, HASH_SALT } from "../../utils/jwt-helper";

export const registerController: RequestHandler<any, any, LoginBody> = async (
  req,
  res,
  next
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      const error = new AppError("BadRequestException", "User already exists");
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, HASH_SALT);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        email: true,
        id: true,
      },
    });

    const accessToken = createAndRefreshToken({ id: newUser.id }, res);
    return res.status(SuccessType.Created).json({ user: newUser, accessToken });
  } catch (e: any) {
    const error = new AppError("InternalServerErrorException", e.message);
    return next(error);
  }
};
