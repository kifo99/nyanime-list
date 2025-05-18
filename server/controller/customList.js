import axios from "axios";

import { errorHandler } from "../util/helpers.js";
import { Watchlist } from "../model/watchlist.js";

export const createCustomList = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name } = req.body;

    if (!userId || !name)
      throw errorHandler(null, "You did'nt provide user id or list name.", 400);

    const existing = await Watchlist.findOne({
      userId,
      name,
      type: "custom",
    });

    if (existing) throw errorHandler(null, "Already existing list.", 409);

    const newList = new Watchlist({
      userId,
      type: "custom",
      name,
      items: [],
    });

    await newList.save();

    res.status(200).json({
      message: `custom list: ${name} created`,
      list: newList,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Something is wrong pleas try again later",
    });
  }
};

export const getCustomList = async (req, res, next) => {
  try {
    const { userId, listName } = req.params;

    if (!userId || !listName)
      throw errorHandler(null, "User id nad list name are not provided.", 400);

    const customList = await Watchlist.findOne({
      userId,
      name: listName,
      type: "custom",
    });

    if (!customList)
      throw errorHandler(null, `Custom list ${listName} not found.`, 404);

    res.status(200).json({
      message: `Custom list: ${listName} founded.`,
      list: customList,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Something is wrong pleas try again later",
    });
  }
};

export const getAllCustomLists = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId)
      throw errorHandler(null, "User id nad list name are not provided.", 400);

    const customLists = await Watchlist.find({
      userId,
      type: "custom",
    });

    if (!customLists.length)
      throw errorHandler(null, "No custom lists found for this user.", 404);

    res.status(200).json({
      message: "Custom lists fetched.",
      lists: customLists,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Something is wrong pleas try again later",
    });
  }
};
export const addToCustomList = async (req, res, next) => {
  try {
    const { userId, animeId, listName } = req.params;

    const customList = await Watchlist.findOne({
      userId,
      name: listName,
      type: "custom",
    });

    if (!animeId) {
      throw errorHandler(null, "Anime doesn't exist!", 404);
    }
    const { data } = await axios.get(
      `https://api.jikan.moe/v4/anime/${animeId}`
    );

    if (customList && customList.userId.toString() === userId.toString()) {
      const alreadyAdded = customList.items.some(
        (item) => item.animeId === animeId
      );

      if (!alreadyAdded) {
        customList.items.push({
          animeId: animeId,
          image: data.data.images.jpg.image_url,
          title: data.data.title,
          titleJapanese: data.data.title_japanese,
          episodes: +data.data.episodes,
          score: data.data.score,
          addedOn: Date.now(),
        });
        await customList.save();

        return res.status(200).json({
          message: `Anime added to ${listName}`,
          list: customList,
        });
      }

      return res.status(200).json({
        message: `Anime is already in ${listName}`,
        list: customList,
      });
    }

    const tempCustomList = new Watchlist({
      userId: user._id,
      type: "custom",
      name: listName,
      items: [
        {
          animeId: animeId,
          image: data.data.images.jpg.image_url,
          name: data.data.title,
          episodes: +data.data.episodes,
          score: data.data.score,
          addedOn: Date.now(),
        },
      ],
    });

    await tempCustomList.save();

    return res.status(200).json({
      message: `Custom list: ${listName} is created and anime with id: ${animeId} is added.`,
      list: tempCustomList,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Something is wrong pleas try again later",
    });
  }
};
