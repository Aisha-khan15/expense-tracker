import { createExpense } from "./Expense/create.js";
import { deleteExpense } from "./Expense/delete.js";
import { getOneExpense } from "./Expense/get.js";
import { getAllExpense } from "./Expense/getAll.js";
import { updateExpense } from "./Expense/update.js";

const expenseController = {
  create: createExpense,
  getOne: getOneExpense,
  update: updateExpense,
  delete: deleteExpense,
  getAll: getAllExpense,
};

export { expenseController };
