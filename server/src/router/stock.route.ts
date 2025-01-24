import { Router } from "express";

import { getTickers, getAllTickers } from "../controller/stock.controller";

const router = Router();

router.get("/all-tickers", getAllTickers);
router.get("/tickers", getTickers);

export default router;
