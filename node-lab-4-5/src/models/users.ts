import mongoose from "mongoose";
import { IUserDocument, Role } from "../types";

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: Role,
      default: Role.USER,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model<IUserDocument>("users", userSchema);

export default User;
