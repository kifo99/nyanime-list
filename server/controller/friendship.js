import { errorHandler } from "../util/helpers.js";

import { Friendship } from "../model/friendship.js";

export const getRequestList = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) throw errorHandler(null, "You did'nt provide user id", 400);

    const requests = await Friendship.find({
      recipient: userId,
    }).select("requester");

    if (!requests)
      throw errorHandler(
        null,
        "Requests were not fetched or user does'nt have any friend requests"
      );
    res.status(200).json({
      message: "All friend requests",
      requests: requests,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Something is wrong pleas try again later",
    });
  }
};

export const sendRequest = async (req, res, next) => {
  try {
    const { userId, recipientId } = req.params;
    if (!userId || !recipientId)
      throw errorHandler(
        null,
        "You did'nt provide user id or recipient id",
        400
      );

    const existingRequest = await Friendship.findOne({
      requester: userId,
      recipient: recipientId,
    });

    if (existingRequest) throw errorHandler(null, "Request already sent");

    const newFriendship = new Friendship({
      recipient: recipientId,
      requester: userId,
      status: "pending",
      createdAt: Date.now(),
    });

    await newFriendship.save();

    res.status(200).json({
      message: "Friend request sent.",
      friendship: newFriendship,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Something is wrong pleas try again later",
    });
  }
};
