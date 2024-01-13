import { Router } from "express";
import { HpVariantController } from "../controller/hpVariantController.js";

const router = Router()

router.get('/variant/:id', HpVariantController.findVariantByProductId)

export default router