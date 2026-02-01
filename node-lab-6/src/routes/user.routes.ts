import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { validate } from "../middlewares/validator.middleware";
import {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  deleteUserSchema,
} from "../validations/user.validation";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

router
  .route("/")
  .get(authMiddleware, roleMiddleware("admin"), userController.getAllUsers)
  .post(validate(createUserSchema), userController.createUser);

router
  .route("/:id")
  .get(validate(getUserSchema), userController.getUserById)
  .patch(
    authMiddleware,
    roleMiddleware("admin"),
    validate(updateUserSchema),
    userController.updateUser,
  )
  .delete(
    authMiddleware,
    roleMiddleware("admin"),
    validate(deleteUserSchema),
    userController.deleteUser,
  );

export default router;
