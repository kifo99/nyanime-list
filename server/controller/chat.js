import axios from "axios";
import { errorHandler } from "../util/helpers.js";
import { ChatRoom } from "../model/chatRoom.js";
import { Message } from "../model/message.js";

export const getChatRooms = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const chatRooms = await ChatRoom.find({
      members: userId,
      isGroup: false,
    }).select("_id");

    if (!chatRooms) throw errorHandler(null, "No chatRooms find!", 404);

    res.status(200).json({
      message: "All users chat",
      chatRooms: chatRooms,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Something is wrong pleas try again later",
    });
  }
};

export const getChatRoom = async (req, res, next) => {
  try {
    const { chatRoomId } = req.params;

    const chatRoom = await ChatRoom.findById(chatRoomId);

    if (!chatRoom) throw errorHandler(null, "No chatRooms find!", 404);

    res.status(200).json({
      message: "Chat Room fetched",
      chatRoom: chatRoom,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Something is wrong pleas try again later",
    });
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { chatRoomId } = req.params;

    const messages = await Message.find({
      chatRoomId: chatRoomId,
    });

    if (!messages) throw errorHandler(null, "No messages found!", 404);

    res.status(200).json({
      messages: "Found messages.",
      messages: messages,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Something is wrong pleas try again later",
    });
  }
};
