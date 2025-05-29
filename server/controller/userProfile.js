import { User } from "../model/user.js";
import { Profile } from "../model/userProfile.js";

import { errorHandler } from "../util/helpers.js";

export const getProfile = async (req, resizeBy, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) throw errorHandler(null, "User not found!", 404);



  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Something is wrong pleas try again later",
    });
  }
};
