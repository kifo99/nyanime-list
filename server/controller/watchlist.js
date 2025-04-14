import { Watchlist } from "../model/watchlist.js";
import { User } from "../model/user.js";
import mongoose from "mongoose";

export const addToWatchList = async (req, res, next) => {
  const { userId, animeId } = req.params;

  const user = await User.findById(userId);
  const watchlist = await Watchlist.findById(user.watchlistId);

  let tempWatchlist;

  console.log(user.watchlistId);

  if (!watchlist) {
    tempWatchlist = new Watchlist({
      userId: user._id,
      items: [
        {
          animeId: animeId,
          addedOn: Date.now(),
        },
      ],
    });

    user.watchlistId = tempWatchlist._id;

    await user.save();

    console.log("USerrrrrrrr");
  }

  //   console.log(user);
};
