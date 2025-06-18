import express from "express";

import {
  getRequestList,
  sendRequest,
  acceptDeclineRequest,
} from "../controller/friendship.js";

const router = express.Router();

router.get("/user/:userId/friend-request", getRequestList);
router.post("/user/:userId/:recipientId/send-request", sendRequest);
router.post(
  "/user/:userId/:requesterId/:isAccepted/accept-decline-request",
  acceptDeclineRequest
);

export default router;
