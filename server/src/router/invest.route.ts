import { Router } from "express";
import { addTotalInvested, getTotalInvested } from "../controller/invest.controller";

const router = Router();

router.post('/add-investment', addTotalInvested)
router.get('/get-total-invested', getTotalInvested)

export default router;
