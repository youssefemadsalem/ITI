import jwt from "jsonwebtoken";
import { Payload } from "../types/auth.types";
import { env } from "../config/env";
import { CustomError } from "../utils/customError";

class JwtService {
  generateAccessToken = (payload: Payload): string => {
    try {
      return jwt.sign(payload, env.ACCESS_TOKEN.secret, {
        expiresIn: env.ACCESS_TOKEN.lifetime,
      });
    } catch (error: any) {
      throw new CustomError(
        `Failed to generate access token: ${error.message}`,
        500,
      );
    }
  };

  generateRefreshToken = (payload: Payload): string => {
    try {
      return jwt.sign(payload, env.REFRESH_TOKEN.secret, {
        expiresIn: env.REFRESH_TOKEN.lifetime,
      });
    } catch (error: any) {
      throw new CustomError(
        `Failed to generate refresh token: ${error.message}`,
        500,
      );
    }
  };

  verifyAccessToken = (token: string): Payload => {
    try {
      return jwt.verify(token, env.ACCESS_TOKEN.secret) as Payload;
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        throw new CustomError("Access token has expired", 401);
      }
      if (error.name === "JsonWebTokenError") {
        throw new CustomError("Invalid access token", 401);
      }
      throw new CustomError(
        `Failed to verify access token: ${error.message}`,
        401,
      );
    }
  };

  verifyRefreshToken = (token: string): Payload => {
    try {
      return jwt.verify(token, env.REFRESH_TOKEN.secret) as Payload;
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        throw new CustomError("Refresh token has expired", 401);
      }
      if (error.name === "JsonWebTokenError") {
        throw new CustomError("Invalid refresh token", 401);
      }
      throw new CustomError(
        `Failed to verify refresh token: ${error.message}`,
        401,
      );
    }
  };
}

export default new JwtService();
