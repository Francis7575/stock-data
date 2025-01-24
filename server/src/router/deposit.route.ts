import { Router } from "express";
import { addDeposit, getTotalDeposit } from "../controller/deposit.controller";

const router = Router();

router.post('/add-deposit', addDeposit)
router.get('/get-deposit', getTotalDeposit)

export default router;
