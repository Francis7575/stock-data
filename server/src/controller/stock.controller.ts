import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { env } from "../config";

export const getAllTickers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await axios.get(
      `https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&limit=7&apiKey=${env.apiKey}`
    );

    const results = response.data.results || [];

    const feData = results.map((data: any) => ({
      ticker: data.ticker,
      name: data.name,
    }));

    res.status(200).json({ success: true, data: feData });
  } catch (error) {
    next(error);
  }
};

export const getTickers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Fetch ticker info
    const getTickerInfo = await axios.get(
      `https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&limit=100&apiKey=${env.apiKey}`
    );

    const tickerInfoResults = getTickerInfo.data.results || [];

    // Map ticker info to desired structure
    const tickers = tickerInfoResults.map((data: any) => ({
      ticker: data.ticker,
      name: data.name,
    }));

    // Select indices for demonstration purposes (or use the full list)
    const indices = [0, 1, 3, 10];
    const selectedTickers = indices.map((index) => tickers[index]);

    // Fetch prices for the selected tickers
    const pricePromises = selectedTickers.map(async (ticker) => {
      const response = await axios.get(
        `https://api.polygon.io/v2/aggs/ticker/${ticker.ticker}/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=${env.apiKey}`
      );
      const priceResults = response.data.results || [];
      return {
        ticker: ticker.ticker,
        name: ticker.name,
        prices: priceResults.map((data: any) => ({
          high: data.h,
        })),
      };
    });

    // Wait for all price data to be fetched
    const combinedData = await Promise.all(pricePromises);

    res.status(200).json({ success: true, data: combinedData });
  } catch (error: any) {
    next(error);
  }
};

