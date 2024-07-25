import { Category } from "../../model/category.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      response
        .status(400)
        .send(new ApiResponse(400, null, "Required field missing!"));
    }

    const categoryName = await Category.create({
      name,
    });
    res
      .status(201)
      .send(
        new ApiResponse(201, categoryName, "Category created successfully!")
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to create category!"));
  }
};
export { createCategory };
