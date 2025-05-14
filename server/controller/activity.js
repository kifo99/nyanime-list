import { errorHandler } from "../util/helpers.js";
import { User } from "../model/user.js";
import { Likes } from "../model/like.js";

export const like = async (req, res, next) => {
  try {
    const { userId, animeId } = req.params;

    if (!userId || !animeId)
      throw errorHandler(null, "Something went wrong!", 404);

    const user = await User.findById(userId);

    if (!user) throw errorHandler(null, "User not found!", 404);

    const likes = await Likes.findById(user.likesId);

    if (likes && likes.userId.toString() === userId.toString()) {
      const alreadyLiked = likes.likedAnime.some(
        (anime) => anime.animeId === animeId
      );

      if (!alreadyLiked) {
        likes.likedAnime.push({
          animeId: animeId,
        });

        await likes.save();

        return res.status(200).json({
          message: "Liked anime",
          likes: likes,
        });
      }

      return res.status(409).json({
        message: "Anime is already liked.",
      });
    }

    const tempLikes = new Likes({
      userId: user._id,
      likedAnime: [
        {
          animeId: animeId,
        },
      ],
    });

    user.likesId = tempLikes._id;

    await Promise.all([tempLikes.save(), user.save()]);

    return res.status(200).json({
      message: "Liked anime successfully",
      likes: tempLikes,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Something is wrong pleas try again later",
    });
  }
};

export const unlike = async (req, res, next) => {
  try {
    const { userId, animeId } = req.params;

    if (!userId || !animeId)
      throw errorHandler(null, "Something went wrong", 404);

    const user = await User.findById(userId);

    if (!user) throw errorHandler(null, "User not found", 404);

    const likes = await Likes.findById(user.likesId);

    if (!likes) throw errorHandler(null, "Liked anime not found", 404);

    const unlikeAnime = likes.likedAnime.filter((anime) => {
      if (anime.animeId.toString() === animeId) {
        return anime;
      }
    });
    if (unlikeAnime.length < 1)
      throw errorHandler(null, "Anime is not liked!", 404);

    const index = likes.likedAnime.indexOf(unlikeAnime.at(0));

    likes.likedAnime.splice(index, 1);

    await likes.save();

    res.status(200).json({
      message: "Like removed!",
      likes: likes,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Something is wrong pleas try again later",
    });
  }
};
