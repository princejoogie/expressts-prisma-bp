/* eslint-disable no-console */
import { RequestHandler } from "express";
import { AuthBody } from "../dtos/auth.dto";

export const authController: RequestHandler<any, any, AuthBody> = (
  req,
  res
) => {
  console.log({
    body: req.body,
    params: req.params,
    query: req.query,
  });

  res.json({
    message: "Hello World",
  });
};
