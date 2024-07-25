import { Otp } from "../../model/otp.model.js";
import { User } from "../../model/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const verify = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing!"));
    }

    const exists = await User.findOne({ email });

    if (!exists) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Email does not exists!"));
    }

    const exist = await Otp.findOne({ email });

    if (!exist) {
      return res
        .status(400)
        .send(
          new ApiResponse(400, null, "Kindly request an OTP before verify!")
        );
    }

    if (exist.code !== code) {
      return res.status(400).send(new ApiResponse(400, null, "Invalid OTP!"));
    }
    const at = exists.generateAccessToken();
    const rt = exists.generateRefreshToken();

    res.cookie("at", at);
    res.cookie("rt", rt);

    res
      .status(200)
      .send(
        new ApiResponse(
          200,
          { accessToken: at, refreshToken: rt },
          "User logged in successfully!"
        )
      );
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Failed to verify!"));
  }
};

export { verify };
