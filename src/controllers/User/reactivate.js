import { User } from "../../model/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const reactive = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .send(new ApiResponse(400, null, "Email is required!"));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send(new ApiResponse(404, null, "User not found!"));
    }

    if (user.deleted) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Account is already active!"));
    }

    user.deleted = false;
    await user.save();

    res
      .status(200)
      .send(new ApiResponse(200, null, "Account reactivated successfully!"));
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Failed to reactivate!"));
  }
};

export { reactive };
