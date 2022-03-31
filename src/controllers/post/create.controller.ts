/* eslint-disable no-unused-vars */
import { RequestHandler } from "express";
import { CreatePostBody } from "../../dtos/post.dto";
import { AppError } from "../../utils/responses/error";

export const createController: RequestHandler<
  any,
  any,
  CreatePostBody
> = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    return res.json({ success: true, title, content, id: req.userId ?? null });
  } catch (e: any) {
    const error = new AppError("InternalServerErrorException", e.message);
    return next(error);
  }
};
