import { Document, Types } from "mongoose";

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: Role;
  age: number;
  comparePassword(providedPassword: string): Promise<boolean>;
}

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
