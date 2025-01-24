import { NextFunction, Request, Response } from "express";
import pool from "../models/connection";

export const addDeposit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract deposit data from the request body
    const { buying_power } = req.body;

    if (buying_power === undefined || buying_power === null) {
      res.status(400).send("Buying power is required.");
      return;
    }

    await pool.query(`INSERT INTO deposit (buying_power) VALUES ($1)`, [
      buying_power,
    ]);

    res.status(201).send("Deposit added successfully");
  } catch (error) {
    next(error);
  }
};

export const getTotalDeposit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await pool.query(
      "SELECT SUM(buying_power) AS total_deposit FROM deposit"
    );

    // If there's no deposit, return 0
    const totalDeposit = result.rows[0].total_deposit || 0;

    // Send the total deposit as a response
    res.status(200).json({ totalDeposit });
  } catch (error) {
    next(error);
  }
};
