import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import routes from "./routes";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";

const app: Application = express();

app.use(helmet());

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Body parser with size limit
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(routes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
