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

export const getPostParamsSchema = yup.object().shape({
  id: yup.string().min(1).required(),
});

export type GetPostParams = InferType<typeof getPostParamsSchema>;

export const getPostSchema: ValidatorSchema = {
  body: undefined,
  params: getPostParamsSchema,
  query: undefined,
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
