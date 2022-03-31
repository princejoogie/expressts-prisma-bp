import { InferType, object, string } from "yup";
import { ValidatorSchema } from "../middlewares/validator";

/* Create Post Schemas */

export const createPostBodySchema = object({
  title: string().min(1).trim().required(),
  content: string().min(1).trim().required(),
});

export type CreatePostBody = InferType<typeof createPostBodySchema>;

export const createPostSchema: ValidatorSchema = {
  body: createPostBodySchema,
  params: undefined,
  query: undefined,
};
