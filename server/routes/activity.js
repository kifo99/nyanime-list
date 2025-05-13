import express from "express";

import { like } from "../controller/activity.js";

const router = express.Router();

router.post("/like/:userId/:animeId", like);

export default router;
