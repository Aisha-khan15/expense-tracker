import express from "express";
import { categoryController } from "../controllers/category.controller";

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(categoryController.create)
  .get(categoryController.getAll);

export { categoryRouter };
