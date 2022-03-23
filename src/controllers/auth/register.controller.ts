import bcrypt from "bcryptjs";
import { RequestHandler } from "express";

import prisma from "../../lib/prisma";
import { LoginBody } from "../../dtos";
import { AppError } from "../../utils/responses/error";
import { createAndRefreshToken, HASH_SALT } from "../../utils/jwt-helper";

export const registerController: RequestHandler<any, any, LoginBody> = async (
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
    });

    const token = createAndRefreshToken({ id: newUser.id }, res);
    return res.json({ token });
  } catch (e: any) {
    const error = new AppError("InternalServerErrorException", e.message);
    return next(error);
  }
};
