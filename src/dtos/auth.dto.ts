import { InferType, object, string } from "yup";
import { ValidatorSchema } from "../middlewares/validator";

export const loginBodySchema = object({
  email: string().email().trim().required(),
  password: string().trim().required(),
});

export type LoginBody = InferType<typeof loginBodySchema>;

export const loginSchema: ValidatorSchema = {
  body: loginBodySchema,
  params: undefined,
  query: undefined,
};
