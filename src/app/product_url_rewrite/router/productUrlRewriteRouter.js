import { Router } from "express";
import { ProductUrlRewriteController } from "../controller/productUrlRewriteController.js";

const router = Router()

router.get('/product-url/:item', ProductUrlRewriteController.getProductUrl)
router.post('/product-url', ProductUrlRewriteController.getProductUrlByUrl)
router.post('/product-url/create', ProductUrlRewriteController.createProductUrl)

export default router