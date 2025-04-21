import { Watchlist } from "../model/watchlist.js";
import { User } from "../model/user.js";
import { errorHandler } from "../util/helpers.js";

import axios from "axios";

export const addToWatchList = async (req, res, next) => {
  try {
    const { userId, animeId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      throw errorHandler(null, "User doesn't exist!", 404);
    }

    const watchlist = await Watchlist.findById(user.watchlistId);

    if (watchlist && watchlist.userId.toString() === user._id.toString()) {
      const alreadyAdded = watchlist.items.some(
        (item) => item.animeId === animeId
      );

      if (!alreadyAdded) {
        watchlist.items.push({
          animeId: animeId,
          addedOn: Date.now(),
        });
        await watchlist.save();

        return res.status(200).json({
          message: "Anime added to watchlist",
          watchlist: watchlist,
        });
      }

      return res.status(200).json({
        message: "Anime already in watchlist",
        watchlist: watchlist,
      });
    }

    const tempWatchlist = new Watchlist({
      userId: user._id,
      items: [
        {
          animeId: animeId,
          addedOn: Date.now(),
        },
      ],
    });

    user.watchlistId = tempWatchlist._id;

    await Promise.all([tempWatchlist.save(), user.save()]);

    return res.status(200).json({
      message: "Watchlist created and anime added to watchlist",
      watchlist: tempWatchlist,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Something is wrong pleas try again later",
    });
  }
};

export const getWatchlist = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) throw errorHandler(null, "User not founded!", 404);

    const watchlist = await Watchlist.findById(user.watchlistId);

    if (!watchlist) throw errorHandler(null, "Watchlist not founded!", 404);

    const animeIdList = watchlist.items.map((item) => item.animeId);

    const animeList = await Promise.all(
      animeIdList.map(async (id) => {
        const { data } = await axios.get(
          `http://localhost:8080/anime/getAnime/${id}`
        );

        return data;
      })
    );

    res.status(200).json({
      message: "Watchlist found",
      watchlist: animeList,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Something is wrong pleas try again later",
    });
  }
};

export const deleteFromWatchlist = async (req, res, next) => {
  try {
    const { userId, animeId } = req.params;

    const user = await User.findById(userId);
    if (!user) throw errorHandler(null, "User not founded!", 404);

    const watchlist = await Watchlist.findById(user.watchlistId);
    if (!watchlist) throw errorHandler(null, "Watchlist not founded!", 404);

    const deleteAnime = watchlist.items.filter((item) => {
      if (item.animeId.toString() === animeId) {
        return item;
      }
    });
    console.log(deleteAnime);

    if (deleteAnime.length < 1)
      throw errorHandler(null, "Anime is not in watchlist!", 404);

    watchlist.items.pop(deleteAnime);
    await watchlist.save();

    res.status(200).json({
      message: "Deleting anime from watchlist is finished!",
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Something is wrong pleas try again later",
    });
  }
};
