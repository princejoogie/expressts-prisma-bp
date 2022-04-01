import { RequestHandler } from "express";
import prisma from "../../lib/prisma";
import { AppError } from "../../utils/responses/error";
import { SuccessType } from "../../utils/responses/types";

export const getAllController: RequestHandler = async (_, res, next) => {
  try {
    const posts = await prisma.post.findMany();
    return res.status(SuccessType.Created).json({ posts });
  } catch (e: any) {
    const error = new AppError("InternalServerErrorException", e.message);
    return next(error);
  }
};
