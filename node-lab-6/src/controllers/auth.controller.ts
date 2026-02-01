import authService from "../services/auth.service";
import { NextFunction, Request, Response } from "express";

class AuthController {
  signup = async (req: Request, res: Response, next: NextFunction) => {
    const { user, accessToken, refreshToken } = await authService.signup(
      req.body,
    );
    res.status(201).json({
      success: true,
      user,
      accessToken,
      refreshToken,
    });
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { existUser, accessToken, refreshToken } = await authService.login(
      req.body,
    );

    res.status(200).json({
      success: true,
      existUser,
      accessToken,
      refreshToken,
    });
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken } = authService.refresh(
      req.body.refreshToken,
    );
    res.status(200).json({
      success: true,
      accessToken,
      refreshToken, // Return new refresh token (token rotation)
    });
  };
}

export default new AuthController();
