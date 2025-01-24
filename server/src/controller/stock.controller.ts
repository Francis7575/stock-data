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

    // Limit to first 10 items
    // const limitedResults = results.slice(0, 10);

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
    const getTickerInfo = await axios.get(
      `https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&limit=100&apiKey=${env.apiKey}`
    );

    const getPrice = await axios.get(
      `https://api.polygon.io/v2/aggs/ticker/A/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=${env.apiKey}`
    );

    const results1 = getTickerInfo.data.results || [];
    const results2 = getPrice.data.results || [];

    // console.log(results)
    const feData = results1.map((data: any) => ({
      ticker: data.ticker,
      name: data.name,
    }));

    const indices = [0, 1, 3, 5];
    const specificTickers = indices.map((index) => feData[index]);

    res.status(200).json({ success: true, data: specificTickers });
  } catch (error: any) {
    const statusCode = error.response?.status || 500;
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message ||
        "Failed to fetch data from Polygon API."
      : "An unexpected error occurred.";

    res.status(statusCode).json({ success: false, error: message });
    next(error);
  }
};

// export const getAggregateBars = async (
//   _req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
 

//     const results = response.data.results || [];

//     const feData = results.map((data: any) => ({
//       currPrince: data.h,
//     }));

//     res.status(200).json({ success: true, data: feData });
//   } catch (error) {
//     next(error);
//   }
// };

// create a function to calculate if the price went up or down for the current day