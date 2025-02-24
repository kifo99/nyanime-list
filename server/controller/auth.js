import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../model/user.js";
import { SECRET_KEY } from "../util/config.js";
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

export const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    let loadUser;

    const user = await User.findOne({ email: email });

    if (!user) {
      console.log("User not found");
      errorHandler(null, "A user with this email could not be found.", 401);
    }

    loadUser = user;

    if (!bcrypt.compareSync(password, user.password))
      errorHandler(null, "Wrong password", 401);

    const token = jwt.sign(
      {
        email: loadUser.email,
        userId: loadUser._id.toString(),
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token: token,
      userId: loadUser._id.toString(),
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Internal server error",
    });
  }
};
