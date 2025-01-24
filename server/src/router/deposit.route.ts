import { Router } from "express";
import { addDeposit, getDepositTotal } from "../controller/deposit.controller";

const router = Router();

router.post('/add-deposit', addDeposit)
router.get('/get-deposit', getDepositTotal)

export default router;
