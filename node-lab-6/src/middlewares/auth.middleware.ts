import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";
import jwtService from "../services/jwt.service";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new CustomError("Authorization header missing", 401);
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new CustomError("Token missing", 401);
  }

  req.user = jwtService.verifyAccessToken(token);

  next();
};
