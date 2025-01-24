import { Router } from "express";

import { getTickers, getAllTickers, addDeposit } from "../controller/stock.controller";

const router = Router();

router.get("/all-tickers", getAllTickers);
router.get("/tickers", getTickers);
router.get("/add-deposit", addDeposit);

export default router;
