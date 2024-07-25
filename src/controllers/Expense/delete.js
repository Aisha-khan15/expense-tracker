import { Expense } from "../../model/expense.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required field missing!"));
    }
    const exists = await Expense.findById(id);

    if (!exists) {
      res
        .status(404)
        .send(
          new ApiResponse(404, null, "Expense with provided id does not exist!")
        );
    }
    await Expense.findByIdAndDelete(id);

    res
      .status(200)
      .send(new ApiResponse(200, null, "Expense deleted successfully!"));
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to delete expense!"));
  }
};

export { deleteExpense };
