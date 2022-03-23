import { InferType, object, string } from "yup";
import { ValidatorSchema } from "../middlewares/validator";

export const authBodySchema = object({
  email: string().required(),
  password: string().required(),
});

export type AuthBody = InferType<typeof authBodySchema>;

export const authSchema: ValidatorSchema = {
  body: authBodySchema,
  params: undefined,
  query: undefined,
};
