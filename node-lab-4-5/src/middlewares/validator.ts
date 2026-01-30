import { NextFunction, Request, RequestHandler, Response } from "express";
import { IGenralSchema } from "../types";
import APIError from "../utils/APIError";

const keys = ["body", "params", "query"] as const;

const validateSchema =
  <T extends IGenralSchema>(schema: T): RequestHandler =>
  async (req, res, next) => {
    try {
      for (const key of keys) {
        const schemaPart = schema[key];
        if (!schemaPart) continue;
        const result = schemaPart.safeParse(req[key]);
        if (!result.success) {
          throw new APIError(result.error.issues[0].message, 400);
        }
        req[key] = result.data;
      }
      next();
    } catch (err) {
      next(err);
    }
  };

export default validateSchema;
