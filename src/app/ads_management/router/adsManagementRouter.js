import { Router } from "express";
import { AdsManagementController } from "../controller/adsManagementController.js";
import {adsUpload} from "../../../system/middlewares/multerUploadAds.js";

const router = Router()

router.get('/ads', AdsManagementController.findAll)
router.get('/ads/:id', AdsManagementController.findById)
router.post('/ads' , AdsManagementController.create)
router.put('/ads/:id', AdsManagementController.update)
router.delete('/ads/:id', AdsManagementController.delete)

export default router