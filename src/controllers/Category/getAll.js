import { Category } from "../../model/category.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const getAllCategory = async (req, res) => {
  try {
    const allCategory = await Category.find(request.user._id);

    res
      .status(200)
      .send(
        new ApiResponse(200, allCategory, "Fetched all category successfully!")
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to fetch category!"));
  }
};
export { getAllCategory };
