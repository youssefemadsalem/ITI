import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";

export const roleMiddleware = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) throw new CustomError("Unauthorized, please login", 403);

    const userRole = req.user.role;
    if (userRole !== "admin" && !allowedRoles.includes(userRole)) {
      throw new CustomError(
        "Forbidden - You don't have permission to access this resource",
        403,
      );
    }

    next();
  };
};
