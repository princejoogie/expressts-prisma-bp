import * as yup from "yup";
import { InferType } from "yup";
import { ValidatorSchema } from "../middlewares/validator";

export const loginBodySchema = yup.object().shape({
  email: yup.string().email().trim().required(),
  password: yup.string().trim().required(),
});

export type LoginBody = InferType<typeof loginBodySchema>;

export const loginSchema: ValidatorSchema = {
  body: loginBodySchema,
  params: undefined,
  query: undefined,
};
