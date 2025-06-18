import express from "express";

import { getProfile, updateAboutMe } from "../controller/userProfile.js";

const router = express.Router();

router.get("/:userId", getProfile);
router.put("/user/:userId/about-me", updateAboutMe);

export default router;
