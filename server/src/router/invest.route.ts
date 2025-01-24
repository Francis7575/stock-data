import { Router } from "express";
import { TotalInvested } from "../controller/invest.controller";

const router = Router();

router.post('/total-invested', TotalInvested)

export default router;
