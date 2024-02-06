import { CronJob } from "cron";
import axios from "axios";
import { pool } from '../../config/dbConfig.js'

export async function updateExchangerates() {
    const client = await pool.connect();

    try {
        const paramsApiId = '?app_id=677de8c396fa4581923ed2a4b43e6760';
        const apiUrl = 'https://openexchangerates.org/api';
        const exchangePath = '/latest.json';

        const responseExchange = await axios.get(`${apiUrl}${exchangePath}${paramsApiId}`);

        if (!responseExchange || responseExchange.status !== 200) {
            throw { name: 'UpdateExchangeFailed' };
        }

        const dataExchange = responseExchange.data.rates;

        const arrayKeyValue = Object.entries(dataExchange).map(([key, value]) => ([key, value]));

        const placeholders = arrayKeyValue.map((array, index) => {
            let offset = array.length * (index + 1);
            return `WHEN code = $${offset - 1} THEN $${offset}::numeric`;
        }).join(' ');

        const flatValue = arrayKeyValue.flat();

        const updateExchangerates = await client.query(
            `UPDATE public.exchangerates
            SET rate = CASE
            ${placeholders}
            END`,
            flatValue
        );

        console.log('Exchange rates updated successfully.');
    } catch (error) {
        console.error('Error updating exchange rates:', error);
    } finally {
        client.release();
    }
}

// Jadwal cron setiap hari pukul 01:00
const cronSchedule = "0 1 * * *";

export const cronJobUpdateExchangerates = new CronJob(cronSchedule, updateExchangerates, null, true);

