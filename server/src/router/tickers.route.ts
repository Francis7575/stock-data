import { Router } from "express";

import { getTickers, getAllTickers } from "../controller/tickers.controller";

const router = Router();

router.get("/all-tickers", getAllTickers);
router.get("/get-tickers", getTickers);

export default router;
