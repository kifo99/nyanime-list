import express from "express";

import { like, unlike, isLiked } from "../controller/activity.js";

const router = express.Router();

router.post("/like/:userId/:animeId", like);
router.delete("/unlike/:userId/:animeId", unlike);
router.get("/isLiked/:userId/:animeId", isLiked);

export default router;
