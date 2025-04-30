import { errorHandler } from "../util/helpers.js";
import { User } from "../model/user.js";
import { Reviews } from "../model/review.js";

import axios from "axios";

export const addReview = async (req, res, next) => {
  try {
    const { userId, animeId } = req.params;
    const { review, watchedOn, watchedBefore, rating, tags, like } = req.body;

    if (!userId) throw errorHandler(null, "User id is not valid!", 401);

    const user = await User.findById(userId);

    if (!user) throw errorHandler(null, "User was not found!", 404);

    const reviews = await Reviews.findById(user.reviewsId);
    if (!animeId) throw errorHandler(null, "Anime id is not valid!", 401);

    const { data } = await axios.get(
      `https://api.jikan.moe/v4/anime/${animeId}`
    );

    if (!data) throw errorHandler(null, "Something went wrong!", 500);

    // console.log(reviews);

    if (reviews && reviews.userId.toString() === user._id.toString()) {
      const alreadyAdded = reviews.reviews.some(
        (review) => review.animeId === animeId
      );

      if (!alreadyAdded) {
        reviews.reviews.push({
          animeId: animeId,
          image: data.data.images.jpg.image_url,
          title: data.data.title,
          titleJapanese: data.data.title_japanese,
          year: data.data.year,
          review: review,
          watchedOn: watchedOn,
          watchedBefore: watchedBefore,
          rating: rating,
          tags: tags,
          like: like,
        });

        await reviews.save();

        return res.status(200).json({
          message: "Successfully added review",
          reviews: reviews,
        });
      }

      return res.status(200).json({
        message: "Anime already reviewed",
        reviews: reviews,
      });
    }

    const tempReviews = new Reviews({
      userId: user._id,
      reviews: [
        {
          animeId: animeId,
          image: data.data.images.jpg.image_url,
          title: data.data.title,
          titleJapanese: data.data.title_japanese,
          year: data.data.year,
          review: review,
          watchedOn: watchedOn,
          watchedBefore: watchedBefore,
          rating: rating,
          tags: tags,
          like: like,
        },
      ],
    });

    user.reviewsId = tempReviews._id;

    await Promise.all([tempReviews.save(), user.save()]);

    return res.status(200).json({
      message: "Reviews created and review added!",
      reviews: tempReviews,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Something is wrong pleas try again later",
    });
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) throw errorHandler(null, "User id is not valid!", 401);

    const user = await User.findById(userId);

    if (!user) throw errorHandler(null, "User was not found!", 404);

    const reviews = await Reviews.findById(user.reviewsId);

    if (!reviews) throw errorHandler(null, "Reviews was not found!", 404);

    const reviewsList = reviews.reviews;

    console.log(reviewsList);

    res.status(200).json({
      message: "Reviews founded!",
      reviews: reviewsList,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Something is wrong pleas try again later",
    });
  }
};
