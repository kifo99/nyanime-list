import express from "express";

import { getAnime, getAnimeWithId } from "../controller/anime.js";

const router = express.Router();

router.get("/select/:animeId", getAnimeWithId);
router.get("/search/anime/:name", getAnime);

export default router;
