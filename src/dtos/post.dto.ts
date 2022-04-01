import * as yup from "yup";
import { InferType } from "yup";
import { ValidatorSchema } from "../middlewares/validator";

/* Create Post Schemas */

export const createPostBodySchema = yup.object().shape({
  title: yup.string().min(1).required(),
  content: yup.string().min(1).required(),
});

export type CreatePostBody = InferType<typeof createPostBodySchema>;

export const createPostSchema: ValidatorSchema = {
  body: createPostBodySchema,
  params: undefined,
  query: undefined,
};

/* Update Post Schemas */

export const updatePostBodySchema = yup.object().shape({
  title: yup.string().min(1),
  content: yup.string().min(1),
});

export type UpdatePostBody = InferType<typeof updatePostBodySchema>;

export const updatePostParamsSchema = yup.object().shape({
  id: yup.string().min(1).required(),
});

export type UpdatePostParams = InferType<typeof updatePostParamsSchema>;

export const updatePostSchema: ValidatorSchema = {
  body: updatePostBodySchema,
  params: updatePostParamsSchema,
  query: undefined,
};

/* Get Post Schemas */

export const getPostByIdParamsSchema = yup.object().shape({
  id: yup.string().min(1).required(),
});

export type GetPostByIdParams = InferType<typeof getPostByIdParamsSchema>;

export const getPostByIdSchema: ValidatorSchema = {
  body: undefined,
  params: getPostByIdParamsSchema,
  query: undefined,
};

export const getAllPostQuerySchema = yup.object().shape({
  limit: yup
    .string()
    .matches(/^[1-9][0-9]?$|^100$/)
    .default("10"),
  cursor: yup.string().min(1),
  order: yup.string().oneOf(["asc", "desc"]).default("asc"),
});

export type GetAllPostQuery = InferType<typeof getAllPostQuerySchema>;

export const getAllPostSchema: ValidatorSchema = {
  body: undefined,
  params: undefined,
  query: getAllPostQuerySchema,
};

/* Delete Post Schemas */

export const deletePostParamsSchema = yup.object().shape({
  id: yup.string().min(1).required(),
});

export type DeletePostParams = InferType<typeof deletePostParamsSchema>;

export const deletePostSchema: ValidatorSchema = {
  body: undefined,
  params: deletePostParamsSchema,
  query: undefined,
};
