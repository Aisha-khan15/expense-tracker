import { Expense } from "../../model/expense.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const { amount, date, description } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Required fields missing" });
    }
    const exists = await Expense.findById(id);

    if (!exists) {
      return res
        .status(404)
        .send(
          new ApiResponse(404, null, "Expense with provided Id does not exist!")
        );
    }

    const updated = await Expense.findByIdAndUpdate(
      id,
      { amount, date, description },
      { new: true }
    );

    res.status(200).send(200, updated, "Expense updated successfully!");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to update expense!"));
  }
};
export { updateExpense };
