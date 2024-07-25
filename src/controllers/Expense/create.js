import { Expense } from "../../model/expense.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const createExpense = async (req, res) => {
  try {
    const { amount, date, description } = req.body;

    if (!amount || !date || !description) {
      res
        .status(400)
        .send(new ApiResponse(400, null, "Required field missing!"));
    }

    const expenses = await Expense.create({
      amount,
      date,
      description,
    });

    res
      .status(201)
      .send(new ApiResponse(201, expenses, "Expense created successfully!"));
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to create expense!"));
  }
};
export { createExpense };
