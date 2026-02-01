import { Router } from "express";
import authController from "../controllers/auth.controller";
import { validate } from "../middlewares/validator.middleware";
import { createUserSchema } from "../validations/user.validation";
import {
  loginSchema,
  refreshTokenSchema,
} from "../validations/auth.validation";

const router = Router();

router.route("/signup").post(validate(createUserSchema), authController.signup);
router.route("/login").post(validate(loginSchema), authController.login);
router
  .route("/refresh")
  .post(validate(refreshTokenSchema), authController.refreshToken);

export default router;
