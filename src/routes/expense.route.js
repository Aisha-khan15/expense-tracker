import express from "express";
import { expenseController } from "../controllers/expense.controller.js";

const expenseRouter = express.Router();

expenseRouter
  .route("/")
  .post(expenseController.create)
  .get(expenseController.getAll);

expenseRouter
  .route("/:id")
  .put(expenseController.update)
  .delete(expenseController.delete)
  .get(expenseController.getOne);

export { expenseRouter };
