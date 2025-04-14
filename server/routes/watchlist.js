import express from "express";

import { addToWatchList } from "../controller/watchlist.js";

const router = express.Router();

router.post("/add/:userId/:animeId", addToWatchList);

export default router;
