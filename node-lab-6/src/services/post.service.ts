import { Post } from "../models/post.model";
import { ICrudService } from "../types/crud.interface";
import { IPostDocument } from "../types/post.types";
import { CustomError } from "../utils/customError";

export class PostService implements ICrudService<IPostDocument> {
  async getAll(): Promise<IPostDocument[]> {
    return Post.find().sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<IPostDocument> {
    const post = await Post.findById(id);
    if (!post) {
      throw new CustomError("Post not found", 404);
    }
    return post;
  }

  async create(data: Partial<IPostDocument>): Promise<IPostDocument> {
    return await Post.create(data);
  }

  async update(
    id: string,
    data: Partial<IPostDocument>,
    ownerId: string,
  ): Promise<IPostDocument> {
    const post = await Post.findOneAndUpdate(
      { _id: id, author: ownerId },
      data,
      {
        new: true,
      },
    );

    if (!post) {
      throw new CustomError("Post not found", 404);
    }

    return post;
  }

  async delete(id: string, ownerId: string): Promise<void> {
    const post = await Post.findOneAndDelete({ _id: id, author: ownerId });
    if (!post) {
      throw new CustomError("Post not found", 404);
    }
  }
}

export const postService = new PostService();
