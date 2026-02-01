import { Request, Response, NextFunction } from "express";
import { postService } from "../services/post.service";

export class PostController {
  getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    const posts = await postService.getAll();
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  };

  getPostById = async (req: Request, res: Response, next: NextFunction) => {
    const post = await postService.getById(req.params.id as string);
    res.status(200).json({
      success: true,
      data: post,
    });
  };

  createPost = async (req: Request, res: Response, next: NextFunction) => {
    req.body.author = req.user?.id;
    const post = await postService.create(req.body);
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  };

  updatePost = async (req: Request, res: Response, next: NextFunction) => {
    const post = await postService.update(
      req.params.id as string,
      req.body,
      req.user?.id as string,
    );
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  };

  deletePost = async (req: Request, res: Response, next: NextFunction) => {
    await postService.delete(req.params.id as string, req.user?.id as string);
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  };
}

export const postController = new PostController();
