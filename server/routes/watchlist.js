import express from "express";

import {
  addToWatchList,
  getWatchlist,
  deleteFromWatchlist
} from "../controller/watchlist.js";

const router = express.Router();

router.get("/get/:userId", getWatchlist);
router.post("/add/:userId/:animeId", addToWatchList);
router.delete("/delete/:userId/:animeId", deleteFromWatchlist);

export default router;
