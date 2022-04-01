import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "yup";
import { AnyObject, ValidateOptions } from "yup/lib/types";
import { AppError } from "../utils/responses/error";

export interface ValidatorSchema {
  body?: ObjectSchema<any>;
  params?: ObjectSchema<any>;
  query?: ObjectSchema<any>;
}

export function validator(schema: ValidatorSchema) {
  const opts: ValidateOptions<AnyObject> = { strict: true };

  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        req.body = await schema.body.validate(req.body, opts);
      }
      if (schema.query) {
        req.query = await schema.query.validate(req.query, opts);
      }
      if (schema.params) {
        req.params = await schema.params.validate(req.params, opts);
      }
      return next();
    } catch (e: any) {
      const error = new AppError("BadRequestException", e.message);
      return next(error);
    }
  };
}
