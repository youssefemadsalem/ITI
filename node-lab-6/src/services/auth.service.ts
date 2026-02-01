import jwtService from "./jwt.service";
import { userService } from "./user.service";
import { IUserDocument } from "../types/user.types";
import { LoginDto } from "../types/auth.types";
import { CustomError } from "../utils/customError";

class AuthService {
  signup = async (data: Partial<IUserDocument>) => {
    const user = await userService.create(data);
    const accessToken = jwtService.generateAccessToken({
      email: user.email,
      id: user._id.toString(),
      role: user.role,
    });
    const refreshToken = jwtService.generateRefreshToken({
      email: user.email,
      id: user._id.toString(),
      role: user.role,
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  };

  login = async (data: LoginDto) => {
    const existUser = await userService.getByEmail(data.email);
    if (!existUser) {
      throw new CustomError("invalid email or password", 401);
    }

    const isCorrect = await existUser.comparePassword(data.password);
    if (!isCorrect) {
      throw new CustomError("invalid email or password", 401);
    }
    const accessToken = jwtService.generateAccessToken({
      email: existUser.email,
      id: existUser._id.toString(),
      role: existUser.role,
    });
    const refreshToken = jwtService.generateRefreshToken({
      email: existUser.email,
      id: existUser._id.toString(),
      role: existUser.role,
    });

    return {
      existUser,
      accessToken,
      refreshToken,
    };
  };

  refresh = (refreshToken: string) => {
    const payload = jwtService.verifyRefreshToken(refreshToken);

    // Generate both new access token AND new refresh token (token rotation)
    const newAccessToken = jwtService.generateAccessToken({
      email: payload.email,
      id: payload.id,
      role: payload.role,
    });

    const newRefreshToken = jwtService.generateRefreshToken({
      email: payload.email,
      id: payload.id,
      role: payload.role,
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  };
}

export default new AuthService();
