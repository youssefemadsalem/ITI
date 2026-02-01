import { User } from "../models/user.model";
import { ICrudService } from "../types/crud.interface";
import { IUserDocument } from "../types/user.types";
import { CustomError } from "../utils/customError";

export class UserService implements ICrudService<IUserDocument> {
  async getAll(): Promise<IUserDocument[]> {
    return User.find().sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<IUserDocument> {
    const user = await User.findById(id);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    return user;
  }

  async create(data: Partial<IUserDocument>): Promise<IUserDocument> {
    if (data.email) {
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser) {
        throw new CustomError("Email already exists", 400);
      }
    }
    return await User.create(data);
  }

  async update(
    id: string,
    data: Partial<IUserDocument>,
  ): Promise<IUserDocument> {
    if (data.email) {
      const existingUser = await User.findOne({
        email: data.email,
        _id: { $ne: id },
      });
      if (existingUser) {
        throw new CustomError("Email already exists", 400);
      }
    }

    const user = await User.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    return user;
  }

  async delete(id: string): Promise<void> {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
  }

  async getByEmail(email: string): Promise<IUserDocument> {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    return user;
  }
}

export const userService = new UserService();
