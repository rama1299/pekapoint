import {Router} from "express";
import { ProductController } from "../controller/productController.js";

const router = Router()

router.get('/product', ProductController.findProduct)
router.get('/product/:slug', ProductController.findProductBySlug)
router.get('/product/spec/:id', ProductController.findProductSpecById)

export default router