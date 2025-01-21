import axios from "axios";
import { NextFunction, Request, Response } from "express";

import { env } from "../config";

export const getStock = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await axios.get(
      `https://api.polygon.io/vX/reference/financials?limit=10&apiKey=${env.apiKey}`
    );

    const results = response.data.results || [];

    const feData = results.map((data: any) => ({
      companyName: data.company_name,
      financials: data.financials,
    }));

    res.status(200).json({ success: true, data: feData });
  } catch (error) {
    next(error);
  }
};
