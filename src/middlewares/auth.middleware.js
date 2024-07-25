import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  const bearerAuth = req.headers.authorization;

  if (!bearerAuth) {
    return res
      .status(400)
      .send(
        new ApiResponse(400, null, "Missing Bearer Authentication header.")
      );
  }

  const token = bearerAuth.split(" ")[1];

  if (!token) {
    return res.status(400).send(new ApiResponse(400, null, "Token missing."));
  }

  const userDetails = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  console.log(userDetails);

  if (!userDetails) {
    return res.status(401).send(new ApiResponse(401, null, "Token invalid."));
  }

  if (!userDetails.deleted) {
    return res
      .status(400)
      .send(
        new ApiResponse(400),
        null,
        "Account with provided ID has been deactivated, Kindly reactivate to continue!"
      );
  }
  req.user = userDetails;
  next();
};

export { checkAuth };
