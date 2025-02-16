import express from "express";
import { body } from "express-validator";
import { signup } from "../controller/auth.js";

import { User } from "../model/user.js";

const router = express.Router();

router.post(
  "/signup",
  [
    body("name").trim().not().isEmpty(),
    body("email")
      .isEmail()
      .custom(async (value, { req }) => {
        console.log("Triggered");

        const userDoc = await User.findOne({ email: value });
        if (userDoc) return new Promise.reject("Email address already exist!");
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
  ],
  signup
);

export default router;
