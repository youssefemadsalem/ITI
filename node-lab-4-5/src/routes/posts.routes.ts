import { Router } from "express";
import PostsController from "../controllers/posts.controller";
import validateSchema from "../middlewares/validator";
import {
  createPostSchema,
  deletePostSchema,
  getPostByIdSchema,
  updatePostSchema,
} from "../schemas/posts";

const router = Router();

router.get("/", PostsController.getAllPosts);
router.get(
  "/:id",
  validateSchema(getPostByIdSchema),
  PostsController.getPostById,
);
router.post("/", validateSchema(createPostSchema), PostsController.createPost);
router.patch(
  "/:id",
  validateSchema(updatePostSchema),
  PostsController.updatePost,
);
router.delete(
  "/:id",
  validateSchema(deletePostSchema),
  PostsController.deletePost,
);

export default router;
