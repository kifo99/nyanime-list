import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../model/user.js";
import { errorHandler } from "../util/helpers.js";

export const signup = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const message = errors.array().at(0).msg;
      errorHandler(errors, message, 422);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      avatar: "images/avatar",
    });

    const result = await user.save();

    res.status(200).json({
      message: "user signed up",
      user: result,
    });
  } catch (err) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  }
};
