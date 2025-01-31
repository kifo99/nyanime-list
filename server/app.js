import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";

import { PORT } from "./util/config.js";
import animeRouter from "./routes/anime.js";

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

app.listen(PORT || 8000);
