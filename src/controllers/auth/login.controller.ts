import { RequestHandler } from "express";
import { LoginBody } from "../../dtos";
import { AppError } from "../../utils/responses/error";
import prisma from "../../lib/prisma";

export const loginController: RequestHandler<any, any, LoginBody> = async (
  req,
  res,
  next
) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    const error = new AppError("NotFoundException", "User not found");
    return next(error);
  }

  if (user.password !== password) {
    const error = new AppError("UnauthorizedException", "Invalid credentials");
    return next(error);
  }

  return res.json(user);
};
