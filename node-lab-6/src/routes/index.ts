import { Router } from "express";
import userRoutes from "./user.routes";
import postRoutes from "./post.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/api/v1/users", userRoutes);
router.use("/api/v1/posts", postRoutes);
router.use("/api/v1/auth", authRoutes);

export default router;
