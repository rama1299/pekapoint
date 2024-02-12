import {pool} from '../../../config/dbConfig.js'
import fs, { read } from 'fs'
import { updateProductHomeJson } from '../../../system/services/cronUpdateProductHome.js'

export class HomeProductController {
    static async getProduct(req, res, next) {
        try {
            let dataJson = ""

            try {
                let pathDir = 'src/system/services/productHome.json'
                let readFile = fs.readFileSync(pathDir, 'utf-8')

                if (readFile) {
                    dataJson = JSON.parse(readFile)
                }
            } catch (error) {
                let updateJson = await updateProductHomeJson()
                dataJson = updateJson
            }

            if (dataJson == "") {
                throw {name:'ErrorNotFound'}
            }
            
            res.status(200).json(dataJson)

        } catch (error) {
            next(error);
        } finally {
        }
    }
    
}