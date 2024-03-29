import {Router} from "express";
import { ProductController } from "../controller/productController.js";
import { authentication } from "../../../system/middlewares/authentication.js";

const router = Router()

router.use('/product', authentication);

router.get('/product', ProductController.findProduct);
router.get('/product/brand', ProductController.findBrand);
router.get('/product/top', ProductController.getTopProduct);
router.post('/product/search', ProductController.getProductBySearch)
router.get('/product/:slug', ProductController.findProductBySlug);
router.post('/product/image', ProductController.findProductImageBytitle);
router.get('/product/image/:slug', ProductController.findProductImageBySlug);
router.get('/product/spec/:id', ProductController.findProductSpecById);

export default router