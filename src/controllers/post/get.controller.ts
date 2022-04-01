import { Post } from "@prisma/client";
import { RequestHandler } from "express";
import { GetPostByIdParams, GetAllPostQuery } from "../../dtos/post.dto";
import prisma from "../../lib/prisma";
import { AppError } from "../../utils/responses/error";
import { SuccessType } from "../../utils/responses/types";

export const getAllController: RequestHandler<
  any,
  Post[],
  any,
  GetAllPostQuery
> = async (req, res, next) => {
  try {
    const { limit, order, cursor } = req.query;
    const posts = await prisma.post.findMany({
      take: limit ? +limit : 10,
      skip: 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        id: order === "desc" ? "desc" : "asc",
      },
    });
    return res.status(SuccessType.OK).json(posts);
  } catch (e: any) {
    const error = new AppError("InternalServerErrorException", e.message);
    return next(error);
  }
};

export const getByIdController: RequestHandler<
  GetPostByIdParams,
  Post
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({ where: { id } });
    return res.status(SuccessType.OK).json(post);
  } catch (e: any) {
    const error = new AppError("InternalServerErrorException", e.message);
    return next(error);
  }
};
