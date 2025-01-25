import { NextFunction, Request, Response } from "express";
import pool from "../models/connection";

export const addTotalInvested = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { total_investing } = req.body;

    if (total_investing === undefined || total_investing === null) {
      res.status(400).send("Total investing is required.");
      return;
    }

    // Fetch current total buying power
    const result = await pool.query(
      "SELECT SUM(buying_power) AS total_deposit FROM deposit"
    );

    const totalDeposit = result.rows[0].total_deposit || 0;

    // Check if enough buying power is available
    if (total_investing > totalDeposit) {
      res.status(400).send("Insufficient buying power.");
      return;
    }

    // Deduct the total investing amount from the buying power
    await pool.query("INSERT INTO deposit (buying_power) VALUES ($1)", [
      -total_investing,
    ]);

    await pool.query(
      `INSERT INTO investment (total_investing) 
      VALUES ($1)`,
      [total_investing]
    );

    res.status(201).json({
      message: "Investment added successfully and buying power updated.",
    });
  } catch (error) {
    next(error);
  }
};

export const getTotalInvested = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await pool.query(
      "SELECT SUM(total_investing) AS total_invested FROM investment"
    );

    // If there's no deposit, return 0
    const totalInvested = result.rows[0].total_invested || 0;

    // Send the total deposit as a response
    res.status(200).json({ totalInvested });
  } catch (error) {
    next(error);
  }
};