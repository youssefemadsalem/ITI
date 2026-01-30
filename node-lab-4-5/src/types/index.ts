import { Document } from "mongoose";
import { z } from "zod";

export enum Role {
  ADMIN = "admin",
  USER = "user",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: Role;
  age: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDocument extends IUser, Document {}

export interface IParamsWithId {
  id: string;
}

export interface IGenralSchema {
  body?: z.ZodSchema;
  params?: z.ZodSchema;
  query?: z.ZodSchema;
}
