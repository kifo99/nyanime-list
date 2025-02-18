import express from "express";
import { body } from "express-validator";
import { signup } from "../controller/auth.js";

import { User } from "../model/user.js";

const router = express.Router();

router.post(
  "/signup",
  [
    body("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Invalid name!")
      .custom(async (value, { req }) => {
        console.log("Triggered");

        const userDoc = await User.findOne({ name: value });
        if (userDoc) {
          return Promise.reject("Name address already exist!");
        }
      }),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom(async (value, { req }) => {
        console.log("Triggered");

        const userDoc = await User.findOne({ email: value });
        if (userDoc) {
          return Promise.reject("Email address already exist!");
        }
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isStrongPassword({
        minLength: 6,
        minUppercase: 1,
        minLowercase: 1,
        minSymbols: 1,
        minNumbers: 1,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingNumber: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
      })
      .withMessage("Password is not strong enough or is not valid"),

    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        const password = req.body.password;

        if (value !== password) {
          console.error("Password needs to be the same");
          throw new Error("Password needs to be the same");
        }
        return true;
      }),
  ],
  signup
);

export default router;
