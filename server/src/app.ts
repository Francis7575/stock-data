import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import { env } from "./config";
import { IError } from "./types";
import { errorHandler, requestLogger } from "./middleware";

import tickersRouter from "./router/tickers.route";
import depositRouter from "./router/deposit.route"  

const corsOption = {
  origin: [env.frontendUrl || "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOption));

app.use(requestLogger);

app.use("/api/v1/tickers", tickersRouter);
app.use("/api/v1/deposit", depositRouter);

app.get("/api", (_req: Request, res: Response) => {
  res.json({ message: "Server is running" });
});

app.use((_req: Request, _res: Response, next: NextFunction) => {
  const error = new Error("Not Found") as IError;
  error.status = 404;
  next(error);
});

app.use(errorHandler);

export default app;
