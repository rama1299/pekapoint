import { Router } from "express";
import { HomeProductController } from "../controller/homeProductController.js";

const router = Router()

router.get('/home-product', HomeProductController.getProduct)

export default router