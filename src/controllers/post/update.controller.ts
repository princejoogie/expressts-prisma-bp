/* eslint-disable no-unused-vars */
import { RequestHandler } from "express";

export const updateController: RequestHandler = async (_res, res, _next) => {
  return res.json({ success: true });
};
