import express from "express";

import { tokenAuthentication } from "../middleware/tokenAuthentication.js";

import {
  addToWatchList,
  getWatchlist,
  deleteFromWatchlist,
} from "../controller/watchlist.js";

const router = express.Router();

router.get("/get/:userId", tokenAuthentication, getWatchlist);
router.post("/add/:userId/:animeId", tokenAuthentication, addToWatchList);
router.delete(
  "/delete/:userId/:animeId",
  tokenAuthentication,
  deleteFromWatchlist
);

export default router;
