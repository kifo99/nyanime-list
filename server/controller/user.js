import { User } from "../model/user.js";
import { errorHandler } from "../util/helpers.js";

export const getUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) errorHandler(null, "User not found!", 404);

    res.status(200).json({
      message: "User data.",
      user: user,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message,
    });
  }
};
