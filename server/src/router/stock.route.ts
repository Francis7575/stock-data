import { Router } from "express";

import { getTickers, getAllTickers, getAggregateBars } from "../controller/stock.controller";

const router = Router();

router.get("/all-tickers", getAllTickers);
router.get("/tickers", getTickers);
router.get("/aggregate-bars", getAggregateBars);

export default router;
