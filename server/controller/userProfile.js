import { User } from "../model/user.js";
import { Profile } from "../model/userProfile.js";

import { errorHandler } from "../util/helpers.js";

export const getProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) throw errorHandler(null, "User not found!", 404);

    console.log(user);

    const profile = await Profile.findById(user.profileId);

    if (!profile) throw errorHandler(null, "Profile not found!", 404);

    res.status(200).json({
      message: "Profile fetched",
      profile: profile,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Something is wrong pleas try again later",
    });
  }
};

export const updateAboutMe = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { newAboutMe } = req.body;

    const user = await User.findById(userId);
    if (!user) throw errorHandler(null, "User not found!", 404);

    const profile = await Profile.findById(user.profileId);

    if (!profile) throw errorHandler(null, "Profile not found!", 404);

    profile.aboutMe = newAboutMe;

    await profile.save();

    console.log(profile);

    res.status(200).json({
      message: "About-me is updated.",
      profile: profile,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message,
    });
  }
};
