import { RequestHandler } from "express";
import { CreatePostBody } from "../../dtos/post.dto";
import prisma from "../../lib/prisma";
import { AppError } from "../../utils/responses/error";
import { SuccessType } from "../../utils/responses/types";

export const createController: RequestHandler<
  any,
  any,
  CreatePostBody
> = async (req, res, next) => {
  try {
    if (!req.userId) {
      const error = new AppError(
        "UnauthorizedException",
        "You must be logged in"
      );
      return next(error);
    }

    const { title, content } = req.body;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        Author: { connect: { id: req.userId } },
      },
    });

    return res.status(SuccessType.Created).json({ post });
  } catch (e: any) {
    const error = new AppError("InternalServerErrorException", e.message);
    return next(error);
  }
};
