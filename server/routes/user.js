import express from "express";

import {
  getUser,
  searchUserByName,
  updateProfilePic,
} from "../controller/user.js";
import imageUpload from "../middleware/imageUpload.js";

const router = express.Router();

router.get("/profile/:userId", getUser);
router.get("/:username/search-user", searchUserByName);
router.put(
  "/:userId/profile-picture",
  imageUpload.single("newProfilePic"),
  updateProfilePic
);

export default router;
