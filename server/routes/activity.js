import express from "express";

import { like, unlike } from "../controller/activity.js";

const router = express.Router();

router.post("/like/:userId/:animeId", like);
router.delete("/unlike/:userId/:animeId", unlike);

export default router;
