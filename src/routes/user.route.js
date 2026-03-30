import { Router } from "express";
import * as UserController from "../controllers/user.controller.js";

const router = Router();

router.get("/", UserController.getAllUsers);

router.post("/", UserController.createUser);

router
  .route("/:id")
  .get(UserController.getUser)
  .patch(UserController.updateUsername)
  .delete(UserController.deleteUser);

export default router;
