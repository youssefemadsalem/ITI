import { Router } from "express";
import { postController } from "../controllers/post.controller";
import { validate } from "../middlewares/validator.middleware";
import {
  createPostSchema,
  updatePostSchema,
  getPostSchema,
  deletePostSchema,
} from "../validations/post.validation";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router
  .route("/")
  .get(authMiddleware, postController.getAllPosts)
  .post(authMiddleware, validate(createPostSchema), postController.createPost);

router
  .route("/:id")
  .get(authMiddleware, validate(getPostSchema), postController.getPostById)
  .patch(authMiddleware, validate(updatePostSchema), postController.updatePost)
  .delete(
    authMiddleware,
    validate(deletePostSchema),
    postController.deletePost,
  );

export default router;
