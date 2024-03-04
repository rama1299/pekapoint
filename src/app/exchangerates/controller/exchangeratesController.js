import {pool} from '../../../config/dbConfig.js'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config() 

const schema = process.env.SCHEMA

export class ExchangeratesController {
    static async updateExchangerates(req, res, next) {
        const client = await pool.connect()
        try {
            const paramsApiId = '?app_id=677de8c396fa4581923ed2a4b43e6760' 
            const apiUrl = 'https://openexchangerates.org/api'
            const exchangePath = '/latest.json'

            const responseExchange = await axios.get(`${apiUrl}${exchangePath}${paramsApiId}`)
            
            if (!responseExchange || responseExchange.status != 200 ) {
                throw ({name: 'UpdateExchangeFailed'})
            }

            const dataExchange = responseExchange.data.rates

            const arrayKeyValue = Object.entries(dataExchange).map(([key, value]) => ([key, value]));

            const placeholders = arrayKeyValue.map((array, index) => {
                let offset = array.length * (index + 1);
                return `WHEN code = $${offset - 1} THEN $${offset}::numeric`;
            }).join(' ');
            
            const flatValue = arrayKeyValue.flat();
            
            const updateExchangerates = await client.query(
                `UPDATE ${schema}.exchangerates
                SET rate = CASE
                ${placeholders}
                END`,
                flatValue
            );

            res.status(200).json({messaage: 'Update success'})
            
        } catch (error) {
            next(error)
        } finally {
            client.release()
        }
    }

    static async getExchangeByCode(req, res, next) {
        const client = await pool.connect()
        try {
            const codeCurrency = req.params.code ?? 'usd'
            
            if (!codeCurrency) {
                throw({name: 'InvalidCredentials'})
            }

            const findRate = await client.query(
                `SELECT code, rate, symbol
                FROM ${schema}.exchangerates
                WHERE code IN ($1,'EUR');`,
                [codeCurrency.toUpperCase()]
            )

            const data = findRate.rows

            res.status(200).json(data)
        } catch (error) {
            next(error)
        } finally {
            client.release()
        }
    }

    static async getExchangeRates(req, res, next) {
        const client = await pool.connect()
        try {
            const findData = await client.query(
                `SELECT *
                FROM ${schema}.exchangerates
                WHERE code IN ('EUR', 'IDR', 'USD', 'JPY', 'CNY', 'SGD', 'AED')`
            )

            const data = findData.rows

            res.status(200).json(data)
        } catch (error) {
            next(error)
        } finally {
            client.release()
        }
    }

}