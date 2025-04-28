import express from "express";

import { tokenAuthentication } from "../middleware/tokenAuthentication";
import { addReview } from "../controller/reviews";

const router = express.Router();

router.post("/add/:userId", addReview);

export default router;
