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
