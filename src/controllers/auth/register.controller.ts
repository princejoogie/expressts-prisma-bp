import { RequestHandler } from "express";
import { LoginBody } from "../../dtos";
import { AppError } from "../../utils/responses/error";
import prisma from "../../lib/prisma";

export const registerController: RequestHandler<any, any, LoginBody> = async (
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

  if (user) {
    const error = new AppError("BadRequestException", "User already exists");
    return next(error);
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      password,
    },
  });

  return res.json(newUser);
};
