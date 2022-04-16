import { Post } from "@prisma/client";
import { RequestHandler } from "express";
import { CreatePostBody } from "../../dtos/post.dto";

import prisma from "../../lib/prisma";
import { AppError } from "../../utils/responses/error";
import { SuccessType } from "../../utils/responses/types";

export const createController: RequestHandler<
  any,
  Post,
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

    const { title, content, photoUrls } = req.body;
    const photos = photoUrls ? photoUrls.map((url) => ({ url })) : undefined;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        photos: photos
          ? { createMany: { data: photos, skipDuplicates: true } }
          : undefined,
        Author: { connect: { id: req.userId } },
      },
      include: { photos: true },
    });

    return res.status(SuccessType.Created).json(post);
  } catch (e: any) {
    const error = new AppError("InternalServerErrorException", e.message);
    return next(error);
  }
};
