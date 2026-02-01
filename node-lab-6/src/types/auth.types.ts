import jwt from "jsonwebtoken";

export interface Payload extends jwt.JwtPayload {
  id: string;
  email: string;
  role: string;
}

export interface LoginDto {
  email: string;
  password: string;
}
