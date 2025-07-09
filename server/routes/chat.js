import express from "express";
import { getChatRooms, getChatRoom, getMessages } from "../controller/chat.js";

const router = express.Router();

router.get("/user/:userId/chat-rooms", getChatRooms);
router.get("/chatRoom/:chatRoomId/chat-room", getChatRoom);
router.get("/chatRoom/:chatRoomId/messages", getMessages);

export default router;
