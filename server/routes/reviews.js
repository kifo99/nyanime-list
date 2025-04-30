import express from "express";

import { tokenAuthentication } from "../middleware/tokenAuthentication.js";
import { addReview, getReviews } from "../controller/reviews.js";

const router = express.Router();

router.get("/get/:userId/", getReviews);
router.post("/add/:userId/:animeId", addReview);

export default router;
