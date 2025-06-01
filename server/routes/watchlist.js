import express from "express";

import { tokenAuthentication } from "../middleware/tokenAuthentication.js";

import {
  addToWatchList,
  getWatchlist,
  deleteFromWatchlist,
  getList,
} from "../controller/watchlist.js";

import {
  createCustomList,
  getCustomList,
  addToCustomList,
  getAllCustomLists,
} from "../controller/customList.js";

const router = express.Router();

router.get("/get/:userId", tokenAuthentication, getWatchlist);
router.post("/add/:userId/:animeId", tokenAuthentication, addToWatchList);
router.get("/users/:userId/custom-lists", getAllCustomLists);
router.get("/user/:userId/list/:type/:name?", getList);
router.get("/users/:userId/custom-list/:listName", getCustomList);
router.post("/users/:userId/custom-list", createCustomList);
router.post("/users/:userId/custom-list/:listName/:animeId", addToCustomList);
router.delete(
  "/delete/:userId/:animeId",
  tokenAuthentication,
  deleteFromWatchlist
);

export default router;
