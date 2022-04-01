import { RequestHandler } from "express";
import { Post } from "@prisma/client";

import prisma from "../../lib/prisma";
import { AppError } from "../../utils/responses/error";
import { DeletePostParams } from "../../dtos/post.dto";
import { SuccessType } from "../../utils/responses/types";

export const deleteController: RequestHandler<DeletePostParams, Post> = async (
  req,
  res,
  next
) => {
  try {
    if (!req.userId) {
      const error = new AppError(
        "UnauthorizedException",
        "You must be logged in"
      );
      return next(error);
    }

    const { id } = req.params;
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      const error = new AppError("NotFoundException", "Post not found");
      return next(error);
    }

    if (post.authorId !== req.userId) {
      const error = new AppError(
        "UnauthorizedException",
        "You are not the author of this post"
      );
      return next(error);
    }

    const deletedPost = await prisma.post.delete({ where: { id } });

    return res.status(SuccessType.Created).json(deletedPost);
  } catch (e: any) {
    const error = new AppError("InternalServerErrorException", e.message);
    return next(error);
  }
};
