import express from "express";

import { getAnime } from "../controller/anime.js";

const router = express.Router();

router.get("/search/:name", getAnime);

export default router;
