import express from "express";
import { userController } from "../controllers/user.controller.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.route("/").get(checkAuth, userController.read);

userRouter.route("/:id").get(checkAuth, userController.readOne);

userRouter.route("/:id").put(checkAuth, userController.update);

userRouter.route("/reset/:id").patch(checkAuth, userController.changePassword);

userRouter.route("/:id").delete(checkAuth, userController.delete);

userRouter.route("/reactivate/:id").post(userController.reactivate);

export { userRouter };
