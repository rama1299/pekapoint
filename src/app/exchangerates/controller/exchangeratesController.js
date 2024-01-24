import {pool} from '../../../config/dbConfig.js'
import axios from 'axios'

export class ExchangeratesController {
    static async updateExchangerates(req, res, next) {
        const client = await pool.connect()
        try {
            const paramsApiId = '?app_id=677de8c396fa4581923ed2a4b43e6760' 
            const apiUrl = 'https://openexchangerates.org/api'
            const exchangePath = '/latest.json'
            const currenciesPath = '/currencies.json'

            const responseExchange = await axios.get(`${apiUrl}${exchangePath}${paramsApiId}`)
            const responseCurrencies = await axios.get(`${apiUrl}${currenciesPath}${paramsApiId}`)
            
            if (!responseExchange || responseExchange.status != 200 || !responseCurrencies || responseCurrencies.status != 200) {
                throw ({name: 'UpdateExchangeFailed'})
            }

            const dataExchange = responseExchange.data.rates
            const dataCurrencies = responseCurrencies.data

            const arrayObjExchange = Object.entries(dataExchange).map(([key, value]) => ({ code: key, 'value': value }));
            const arrayObjcurrencies = Object.entries(dataCurrencies).map(([key, currency]) => ({ code: key, 'currency': currency }));

            const mergeData = arrayObjExchange.map((dataEx) => {
                let findMatch = arrayObjcurrencies.find((dataCur) => dataCur.code == dataEx.code)
                if (findMatch) {
                    return [findMatch.code, findMatch.currency, dataEx.value]
                }
            })

            const placeholders = mergeData.map((array, multipleIndex) => {
                let offset = array.length * (multipleIndex + 1)
                return `($${offset - 2}, $${offset - 1}, $${offset - 0})`
            }).join(',')

            const flatValue = mergeData.flat()

            const begin = await client.query('BEGIN');


            const dropTable = await client.query('DELETE FROM public.exchangerates');
            const createData = await client.query(
                `INSERT INTO public.exchangerates (code, currency, value)
                VALUES ${placeholders}`,
                flatValue
            )

            const commit = await client.query('COMMIT');

            console.log(createData)
            res.status(200).json({message: 'success'})
            
        } catch (error) {
            await client.query('ROLLBACK');
            next(error)
        } finally {
            client.release()
        }
    }
}