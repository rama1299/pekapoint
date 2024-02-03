import { Router } from "express";
import { CsvController } from "../controller/csvController.js";

const router = Router()

router.get('/csv-client', CsvController.getCsvClient)
router.get('/csv-server', CsvController.getCsvServer)

export default router