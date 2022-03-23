import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/responses/error";

export interface ValidatorSchema {
  body?: any;
  params?: any;
  query?: any;
}

export function validator(schema: ValidatorSchema) {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      if (schema.body) req.body = await schema.body.validate(req.body);
      if (schema.query) req.query = await schema.query.validate(req.query);
      if (schema.params) req.params = await schema.params.validate(req.params);
      return next();
    } catch (e: any) {
      const error = new AppError("BadRequestException", e.message);
      return next(error);
    }
  };
}
