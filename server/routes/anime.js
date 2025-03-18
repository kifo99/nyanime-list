import express from "express";

import {
  getAnime,
  getAnimeWithId,
  getAvatar,
  getMostPopular,
  getSeasonAnime,
  getRecommendation,
} from "../controller/anime.js";

const router = express.Router();

router.get("/mostPopular", getMostPopular);
router.get("/seasonAnime", getSeasonAnime);
router.get("/animeRecommendation", getRecommendation);
router.get("/select/:animeId", getAnimeWithId);
router.get("/avatar/:name", getAvatar);
router.get("/search/anime/:name", getAnime);

export default router;
