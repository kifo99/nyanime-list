import express from "express";

import { getAnime, getAnimeWithId, getAvatar } from "../controller/anime.js";

const router = express.Router();

router.get("/select/:animeId", getAnimeWithId);
router.get("/search/anime/:name", getAnime);
router.get("/avatar/:name", getAvatar);

export default router;
