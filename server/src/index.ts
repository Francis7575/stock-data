import { Request, Response } from "express";
import app from "./app";
import { env, logger } from "./config";

const PORT = env.port;

app.get("/server-alive", (req: Request, res: Response) => {
  try {
    console.log("hello world");
    res.status(200).send("Test route working");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

app.listen(PORT, () => {
  logger.info(`Server is running on port: ${PORT}`);
});

