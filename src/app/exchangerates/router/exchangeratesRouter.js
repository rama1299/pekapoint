import { Router } from "express";
import { ExchangeratesController } from "../controller/exchangeratesController.js";

const router = Router()

router.get('/exchangerates', ExchangeratesController.getExchangeRates)
router.get('/exchangerates/update', ExchangeratesController.updateExchangerates)
router.get('/exchangerates/update/:code', ExchangeratesController.getExchangeByCode)

export default router