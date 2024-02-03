import fs from 'fs'

export class CsvController {
    static async getCsvClient(req, res, next) {
        try {
            let dataCsv = ''

            try {
                const csvFilePath = 'src/csv/client.csv';
                dataCsv = await fs.promises.readFile(csvFilePath, 'utf-8');
            } catch (error) {
                dataCsv = ''
            }
            
            res.status(200).send(dataCsv)
        } catch (error) {
            next(error)
        }
    }

    static async getCsvServer(req, res, next) {
        try {
            let dataCsv = ''
            
            try {
                const csvFilePath = 'src/csv/server.csv';
                dataCsv = await fs.promises.readFile(csvFilePath, 'utf-8');
            } catch (error) {
                dataCsv = ''
            }
            
            res.status(200).send(dataCsv)
        } catch (error) {
            next(error)
        }
    }
}