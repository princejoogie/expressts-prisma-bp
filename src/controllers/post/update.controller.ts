/* eslint-disable no-unused-vars */
import { RequestHandler } from "express";
import { UpdatePostBody, UpdatePostParams } from "../../dtos/post.dto";
import prisma from "../../lib/prisma";
import { AppError } from "../../utils/responses/error";
import { SuccessType } from "../../utils/responses/types";

export const updateController: RequestHandler<
  UpdatePostParams,
  any,
  UpdatePostBody
> = async (req, res, next) => {
  try {
    if (!req.userId) {
      const error = new AppError(
        "UnauthorizedException",
        "You must be logged in"
      );
      return next(error);
    }

    const { id } = req.params;
    const { content, title } = req.body;
    const newPost: any = {};

    if (content) newPost.content = content;
    if (title) newPost.title = title;

    const updatedPost = await prisma.post.update({
      where: { id },
      data: newPost,
    });

    return res.status(SuccessType.Created).json(updatedPost);
  } catch (e: any) {
    const error = new AppError("InternalServerErrorException", e.message);
    return next(error);
  }
};
