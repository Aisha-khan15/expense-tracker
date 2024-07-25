import { createCategory } from "./Category/create.js";
import { getAllCategory } from "./Category/getAll.js";

const categoryController = {
  create: createCategory,
  getAll: getAllCategory,
};

export { categoryController };
