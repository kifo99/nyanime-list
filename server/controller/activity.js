import { errorHandler } from "../util/helpers.js";
import { User } from "../model/user.js";

export const like = async (req, res, next) => {
  try {
    const { userId, animeId } = req.params;

    if (!userId || !animeId)
      throw errorHandler(null, "Something went wrong!", 404);

    const user = await User.findById(userId);

    if (!user) throw errorHandler(null, "User not found!", 404);

    // res.status(200).json({
    //   message: "Liked anime successfully",
    // });
  } catch (err) {
    console.error(err);
  }
};
