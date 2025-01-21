import dotenv from "dotenv";

import { logger } from "./logger";

dotenv.config();

const requiredEnvVariables = ["API_KEY"];

requiredEnvVariables.forEach((key) => {
  if (!process.env[key]) {
    logger.error(`Environment variable ${key} is missing`);
  }
});

export const env = {
  port: process.env.PORT || 5000,
  frontendUrl: process.env.FRONTEND_URL as string,
  apiKey: process.env.API_KEY as string,
};
