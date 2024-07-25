import { User } from "../../model/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    const exists = await User.findOne({ email: email });

    if (exists) {
      return res
        .status(409)
        .send(
          new ApiResponse(
            409,
            null,
            "User with the provided email already exists. Kindly login."
          )
        );
    }

    const hashed = await bcrypt.hash(password, 10);

    const created = await User.create({
      name,
      email,
      password: hashed,
    });

    const at = created.generateAccessToken();
    const rt = created.generateRefreshToken();

    res.cookie("at", at);
    res.cookie("rt", rt);

    created.refreshToken = rt;
    await created.save();

    res.status(201).send(
      new ApiResponse(
        201,
        {
          user: created,
          accessToken: at,
          refreshToken: rt,
        },
        "User registered successfully."
      )
    );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Error registering user."));
  }
};

export { registerUser };
