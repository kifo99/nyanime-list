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

export const updateProfilePic = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const newProfilePic = req.file;

    let profilePicPath;
    if (newProfilePic) {
      profilePicPath = `/images/avatar/${newProfilePic.filename}`;
    }

    const user = await User.findById(userId);
    if (!user) errorHandler(null, "User not found!", 404);

    console.log(user.avatar);

    user.avatar = profilePicPath;

    await user.save();

    res.status(200).json({
      message: "Profile picture updated.",
      user: user,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message,
    });
  }
};

export const searchUserByName = async (req, res, next) => {
  try {
    const { username } = req.body;
    if (!username) errorHandler(null, "Username not found!", 404);

    const user = await User.findOne({
      name: username,
    });
    if (!user) errorHandler(null, "User not found!", 404);

    res.status(200).json({
      message: "User found!",
      user: user,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message,
    });
  }
};
