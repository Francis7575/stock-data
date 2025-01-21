import { Router } from "express";

import { getStock } from "../controller/stock.controller";

const router = Router();

router.get("/", getStock);

export default router;
