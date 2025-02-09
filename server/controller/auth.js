import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

import { User } from "../model/user.js";

export const signup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
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
};
