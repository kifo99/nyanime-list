import express from "express";

import { addToWatchList, getWatchlist } from "../controller/watchlist.js";

const router = express.Router();

router.get("/get/:userId", getWatchlist);
router.post("/add/:userId/:animeId", addToWatchList);

export default router;
