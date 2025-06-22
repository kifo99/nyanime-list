import express from "express";

import {
  getRequestList,
  getFriendshipList,
  sendRequest,
  acceptDeclineRequest,
} from "../controller/friendship.js";

const router = express.Router();

router.get("/user/:userId/friend-request", getRequestList);
router.get("/user/:userId/friends-list", getFriendshipList);
router.post("/user/:userId/:recipientId/send-request", sendRequest);
router.post(
  "/user/:userId/:requesterId/:isAccepted/accept-decline-request",
  acceptDeclineRequest
);

export default router;
