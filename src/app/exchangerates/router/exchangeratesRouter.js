import { Router } from "express";
import { ExchangeratesController } from "../controller/exchangeratesController.js";

const router = Router()

router.get('/exchangerates/update', ExchangeratesController.updateExchangerates)

export default router