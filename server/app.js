import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { PORT } from "./util/config.js";
import animeRouter from "./routes/anime.js";
import authRouter from "./routes/auth.js";
import { MONGODB_URL } from "./util/config.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: "http://localhost:3000/" }));
app.use(morgan("dev"));
app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use(limiter);

app.use("/anime", animeRouter);
app.use("/admin", authRouter);

try {
  await mongoose.connect(MONGODB_URL);
  console.log("Connected");
  app.listen(PORT || 8000);
} catch (err) {
  console.error(err);
}
