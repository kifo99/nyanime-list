import jwt from "jsonwebtoken";
import { errorHandler } from "../util/helpers.js";
import { SECRET_KEY } from "../util/config.js";

export const tokenAuthentication = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) throw errorHandler(null, "Not authenticated", 401);

    const token = authHeader.split(" ").at(1);

    if (!token)
      throw errorHandler(null, "A token is required for authentication", 401);

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY);
    } catch (err) {
      throw errorHandler(null, "Token verification failed", 401);
    }

    if (!decodedToken)
      throw errorHandler(null, "A token is required for authentication", 401);

    req.userId = decodedToken.userId;

    next();
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Something is wrong pleas try again later",
    });
  }
};
