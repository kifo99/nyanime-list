import express from "express";

import { getRequestList, sendRequest } from "../controller/friendship.js";

const router = express.Router();

router.get("/user/:userId/friend-request", getRequestList);
router.post("/user/:userId/:recipientId/send-request", sendRequest);

export default router;
