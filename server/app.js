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
import userRouter from "./routes/user.js";
import watchlistRouter from "./routes/watchlist.js";
import reviewsRouter from "./routes/reviews.js";
import activityRouter from "./routes/activity.js";
import { MONGODB_URL } from "./util/config.js";
import path from "path";
import { fileURLToPath } from "url";

import imageUpload from "./middleware/imageUpload.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(helmet());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use(limiter);

app.use(bodyParser.json());
app.use(imageUpload.single("image"));
app.use(
  "/images/avatar",
  express.static(path.join(__dirname, "..", "images", "avatar"))
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/anime", animeRouter);
app.use("/admin", authRouter);
app.use("/user", userRouter);
app.use("/watchlist", watchlistRouter);
app.use("/reviews", reviewsRouter);
app.use("/activity", activityRouter);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  if (typeof status !== "number" || status < 100 || status > 500) {
    console.error("Invalid status code");
  }

  res.status(status).json({
    message: message,
    data: data,
  });
});

const startServer = async function () {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected");
    app.listen(PORT || 8000, () =>
      console.log(`🚀 Server running on port ${PORT || 8000}`)
    );
  } catch (err) {
    console.error(err);
  }
};

startServer();
