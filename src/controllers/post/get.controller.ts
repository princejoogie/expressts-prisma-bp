import { RequestHandler } from "express";
import { GetPostParams } from "../../dtos/post.dto";
import prisma from "../../lib/prisma";
import { AppError } from "../../utils/responses/error";
import { SuccessType } from "../../utils/responses/types";

export const getAllController: RequestHandler = async (_, res, next) => {
  try {
    const posts = await prisma.post.findMany();
    return res.status(SuccessType.OK).json(posts);
  } catch (e: any) {
    const error = new AppError("InternalServerErrorException", e.message);
    return next(error);
  }
};

export const getByIdController: RequestHandler<GetPostParams> = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({ where: { id } });
    return res.status(SuccessType.OK).json(post);
  } catch (e: any) {
    const error = new AppError("InternalServerErrorException", e.message);
    return next(error);
  }
};
