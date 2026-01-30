import { NextFunction, Request, Response } from "express";
import PostsService from "../services/posts.service";
import { IParamsWithId } from "../types";

class PostsController {
  static async getAllPosts(req: Request, res: Response, next: NextFunction) {
    const posts = await PostsService.getAllPosts();
    return res.status(200).json({
      message: "Posts fetched successfully",
      data: posts,
    });
  }
  static async getPostById(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    const post = await PostsService.getPostById(req.params.id);
    if (post) {
      return res.status(200).json({
        message: "Post fetched successfully",
        data: post,
      });
    }
    return res.status(404).json({
      message: "Post not found",
    });
  }
  static async createPost(req: Request, res: Response, next: NextFunction) {
    const post = await PostsService.createPost(req.body);
    return res.status(201).json({
      message: "Post created successfully",
      data: post,
    });
  }
  static async updatePost(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    const post = await PostsService.updatePost(req.params.id, req.body);
    if (post) {
      return res.status(200).json({
        message: "Post updated successfully",
        data: post,
      });
    }
    return res.status(404).json({
      message: "Post not found",
    });
  }
  static async deletePost(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    const post = await PostsService.deletePost(req.params.id);
    if (post) {
      return res.status(200).json({
        message: "Post deleted successfully",
        data: post,
      });
    }
    return res.status(404).json({
      message: "Post not found",
    });
  }
}

export default PostsController;
